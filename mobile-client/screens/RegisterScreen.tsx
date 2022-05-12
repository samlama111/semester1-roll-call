import { Button, Flex, Input, Pressable, VStack, Text } from 'native-base';
import React, { useState } from 'react';

import { registerWithEmailAndPassword } from '../services/firebase';
import { RootStackScreenProps } from '../types';

export default function RegisterScreen({ navigation }: RootStackScreenProps<'Register'>) {
    const [name, setName] = useState('') 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSignUp = async () => {
        const regResult = await registerWithEmailAndPassword(name, email, password)
        if (regResult?.user) navigation.navigate('Login')
    } 
    return (
        <Flex flex="1" align="center" justify="center">
            <VStack w="70%">
                <Input my="3" value={name} onChangeText={setName} placeholder="Name" />
                <Input my="3" value={email} onChangeText={setEmail} placeholder="Email" />
                <Input my="3" value={password} onChangeText={setPassword} placeholder="Password" type="password" />
            </VStack>
            <Button my="3" onPress={onSignUp}>Create account</Button>
            <Pressable onPress={() => navigation.navigate('Login')}>
                <Text>Already registered? Login <Text bold underline>here</Text></Text>
            </Pressable>
        </Flex>
    );
}
