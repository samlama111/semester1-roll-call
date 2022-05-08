import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Location from 'expo-location';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { LocationObject } from 'expo-location';
import { Button, Flex, Spinner, VStack } from 'native-base';
import { enroll, getEnrollment, studentId } from '../services/client';
import { DbEnrollment } from '../shared/db/DbEnrollment';
import { useLoadingManager } from '../hooks/useLoading';
import { DbCourse } from '../shared/db/DbCourse';

export default function EnrollScreen({ navigation }: RootTabScreenProps<'Enroll'>) {
  const {loading, startLoading, stopLoading} = useLoadingManager()
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false)
  const [location, setLocation] = useState<LocationObject>()
  const [ongoingRollCall, setOngoingRollCall] = useState<string>()
  const [courseInfo, setCourseInfo] = useState<Partial<DbCourse>>()

  useEffect(() => {
    (async () => {
      startLoading()
      const currentEnrollment = await getEnrollment(studentId)
      if (currentEnrollment.isSucc && currentEnrollment.res) {
        setCourseInfo(currentEnrollment.res.course_info)
        if (currentEnrollment.res.is_student_enrolled) setAlreadyEnrolled(true)
        else setOngoingRollCall(currentEnrollment.res.roll_call_id)
      }
      else console.log('Failed finding a roll-call');
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      stopLoading()
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
    })();
  }, []);
  
  const onEnroll = async () => {
    if (!ongoingRollCall) {console.log('No roll call found'); return}
    startLoading()
    const location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    const reqEnroll = await enroll(studentId, ongoingRollCall)
    stopLoading()
    if (reqEnroll.isSucc) console.log(reqEnroll.res.message)
    else console.log(reqEnroll.err.message)
  }
  return (
    <Flex flex="1" align="center" justify="center">
      {/* TODO: add student info */}
      <Text style={styles.title}>Welcome</Text>
      {loading && <Spinner size="lg" />}
      {ongoingRollCall && (
        <VStack>
          <Text>Class name: {courseInfo?.class_name}</Text>
          <Text>Course name: {courseInfo?.name}</Text>
          <Button onPress={onEnroll}>Enroll</Button>
        </VStack>
      )}
      {alreadyEnrolled && (
        <Text>You're already enrolled! Enjoy the lesson</Text>
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
