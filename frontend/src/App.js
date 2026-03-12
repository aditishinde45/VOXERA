import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Auth from "./pages/Auth.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import VideoMeet from "./pages/VideoMeet.jsx";
import HomeComp from "./pages/HomeComp.jsx";
import History from "./pages/History.jsx";
import Join from "./pages/Join.jsx";
function App() {
  return (
   <Router>
  <AuthProvider>
<Routes>
  <Route path="/" element={<LandingPage/>}/>
  <Route path="/auth" element={<Auth/>}/>
  <Route path="/:url" element={<VideoMeet/>}/>
  <Route path="/join" element={<Join/>}/>
  <Route path="/home" element={<HomeComp/>}/>
  <Route path="/history" element={<History/>}/>

</Routes>
</AuthProvider>
   </Router>
  );
}

export default App;
