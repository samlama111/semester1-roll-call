import { Button, Flex, Input, VStack, Text, Pressable } from 'native-base';
import React, { useState } from 'react';

import { logInWithEmailAndPassword, registerWithEmailAndPassword } from '../services/firebase';
import { RootStackScreenProps } from '../types';

export default function LoginScreen({ navigation }: RootStackScreenProps<'Register'>) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onLogIn = async () => {
        const regResult = await logInWithEmailAndPassword(email, password)
        if (regResult?.user) navigation.navigate('Root')
    } 
    return (
        <Flex flex="1" align="center" justify="center">
            <VStack w="70%">
                <Input my="3" value={email} onChangeText={setEmail} placeholder="Email" />
                <Input my="3" value={password} onChangeText={setPassword} placeholder="Password" type="password" />
            </VStack>
            <Button my="3" onPress={onLogIn}>Login</Button>
            <Pressable onPress={() => navigation.navigate('Register')}>
                <Text>Not registered yet? Sign up <Text bold underline>here</Text></Text>
            </Pressable>
        </Flex>
    );
}
