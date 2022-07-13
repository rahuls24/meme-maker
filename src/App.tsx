import React from "react";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import { ThemeProvider } from "@mui/material/styles";
import MaterialUiTheme from "./custom/theme/MaterialUiTheme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditMemePage from "./components/pages/EditMemePage";
export const AppContext = React.createContext({
  isOnline: false,
});
function App() {
  const [isOnline, setIsOnline] = React.useState(true);

  React.useEffect(() => {
    window.addEventListener('online',()=>{
      setIsOnline(true)
    })
     window.addEventListener('offline',()=>{
      setIsOnline(false)
    })
    return () =>{
      window.removeEventListener('online',()=>{
        setIsOnline(true)
      })
      window.removeEventListener('offline',()=>{
        setIsOnline(false)
      })
    }
  }, []);

  const contextValue = {isOnline}
  return (
	<AppContext.Provider value={contextValue}>
    <ThemeProvider theme={MaterialUiTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/make-memes/:memeId" element={<EditMemePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
	</AppContext.Provider>
  );
}

export default App;
// MaterialUiTheme
