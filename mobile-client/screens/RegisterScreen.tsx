import { Button, Flex, Input, VStack } from 'native-base';
import React, { useState } from 'react';
import { useLoadingManager } from '../hooks/useLoading';

import { registerWithEmailAndPassword } from '../services/firebase';

export default function RegisterScreen() {
    const {loading} = useLoadingManager()
    const [name, setName] = useState('') 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const onSignUp = async () => {
        await registerWithEmailAndPassword(name, email, password)
    }
  return (
    <Flex flex="1" align="center" justify="center">
        <VStack w="70%">
            <Input my="3" value={name} onChangeText={setName} placeholder="Name" />
            <Input my="3" value={email} onChangeText={setEmail} placeholder="Email" />
            <Input my="3" value={password} onChangeText={setPassword} placeholder="Password" type="password" />
        </VStack>
      <Button my="3" onPress={onSignUp}>Sign-up as random user</Button>
    </Flex>
  );
}
