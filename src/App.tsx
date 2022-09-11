import { ChakraProvider } from "@chakra-ui/react";

import theme from "./theme/theme";
import { Router } from "./components/pages/router/Router";


const App = () => {
  
  return (
    <ChakraProvider theme={theme}>
        <Router />
    </ChakraProvider>
  );
}

export default App;
