import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Location from 'expo-location';

import { Text } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { LocationObject } from 'expo-location';
import { Button, Flex, Spinner, useToast, VStack } from 'native-base';
import { enroll, getEnrollment, studentId } from '../services/client';
import { useLoadingManager } from '../hooks/useLoading';
import { DbCourse } from '../shared/db/DbCourse';

export default function EnrollScreen({ navigation }: RootTabScreenProps<'Enroll'>) {
  const { loading, startLoading, stopLoading } = useLoadingManager()
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false)
  const [location, setLocation] = useState<LocationObject>()
  const [ongoingRollCall, setOngoingRollCall] = useState<string>()
  const [courseInfo, setCourseInfo] = useState<Partial<DbCourse>>()
  const toast = useToast()

  const showMessage = (message: string, title?: string) => {
    toast.show({
        title,
        description: message
    })
  }
  const findRollCall = async () => {
    startLoading()
    const currentEnrollment = await getEnrollment(studentId)
    stopLoading()
    if (currentEnrollment.isSucc && currentEnrollment.res) {
      setCourseInfo(currentEnrollment.res.course_info)
      if (currentEnrollment.res.is_student_enrolled) setAlreadyEnrolled(true)
      else setOngoingRollCall(currentEnrollment.res.roll_call_id)
    }
  }
  useEffect(() => {
    findRollCall().then()
  }, [location]);

  useEffect(() => {
    (async () => {
      startLoading()
      let { status } = await Location.requestForegroundPermissionsAsync();
      stopLoading()
      if (status !== 'granted') {
        showMessage('Permission to access location was denied');
        return;
      }
    })();
  }, []);

  const onEnroll = async () => {
    if (!ongoingRollCall) {showMessage('No roll call found'); return}
    startLoading()
    const location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    const reqEnroll = await enroll(studentId, ongoingRollCall)
    stopLoading()
    if (reqEnroll.isSucc) showMessage('', 'You have successfuly enrolled')
    else showMessage(reqEnroll.err.message)
  }
  return (
    <Flex flex="1" align="center" justify="center">
      {/* TODO: add student info */}
      {loading && <Spinner size="lg" />}
      {alreadyEnrolled && (
        <VStack>
          <Text>You're already enrolled! Enjoy the lesson.</Text>
        </VStack>
      )}
      {!ongoingRollCall && !alreadyEnrolled && (
        <VStack>
          <Text>We can't find your roll-call.</Text>
          <Button onPress={findRollCall}>Try again</Button>
        </VStack>
        )}
      {ongoingRollCall && !alreadyEnrolled && (
        <VStack>
          <Text style={styles.title}>Welcome</Text>
          <Text>There is an ongoing roll-call:</Text>
          <Text>Class name: <Text bold>{courseInfo?.class_name}</Text></Text>
          <Text>Course name: <Text bold>{courseInfo?.name}</Text></Text>
          <Button onPress={onEnroll}>Enroll</Button>
        </VStack>
      )}
    </Flex>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
