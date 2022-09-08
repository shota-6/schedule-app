import React from 'react';
import { Button, ChakraProvider } from '@chakra-ui/react'
import theme from './theme/theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Button colorScheme='teal'>Button</Button>
      <p>aaaaa</p>
    </ChakraProvider>
  );
}

export default App;
