import * as yup from 'yup'
import { Flex, Button, Stack } from '@chakra-ui/react'

import { Input } from '../components/Form/Input'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')
})


export default function Home() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })

  const { errors } = formState

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <Stack spacing="4">
          <Input
            type="email"
            name="email"
            label="Email"
            error={errors.email}
            {...register('email')}
          />
          <Input
            type="password"
            name="password"
            label="Senha"
            error={errors.password}
            {...register('password')}
          />
        </Stack>

        <Button
          mt="6"
          type="submit"
          colorScheme="pink"
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
