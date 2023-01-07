import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";

import Header from "../Components/Header";
import SideMenu from "../Components/SideMenu";
import TabMenu from "../Components/TabMenu";

import { ContextConsumer } from "../Utils/Context";
import Loader from "../Components/Loader";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    // padding: theme.spacing(2),
    padding: "0px 20px 20px 20px",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: `${drawerWidth}px`,
    }),
    marginTop: 60,
    backgroundColor: "#FFFFFF",
  })
);

const Home = () => {
  const { user, setUser, patient, setPatient, megaMenu, setMegaMenu } =
    useContext(ContextConsumer);

  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  // uhid and doctor id fetching section START
  let { doctorId, patientId } = useParams();
  // console.log(doctorId, patientId);


  
  useEffect(() => {
    setUser({
      id: doctorId,
      name: "doctor test",
      departmentId:1,
      loaded: true,
    });
    setPatient({
      id: patientId,
      name: "user test",
      ward: "ward",
      loaded: true,
    });
    setMegaMenu({
      list: [
        { name: "menu 1", route: "/" },
        { name: "menu 2", route: "/" },
        { name: "menu 3", route: "/" },
      ],
      loaded: true,
    });
  }, []);



  // loading set START
  useEffect(() => {
    if (user.loaded && patient.loaded && megaMenu.loaded) {
      console.log("patient : ", patient);
      console.log("user : ", user);
      console.log("Menu : ", megaMenu);
      setLoading(false);
    }
  }, [user, patient, megaMenu]);
  // loading set END


  return (
    <div>
      <Header open={open} setOpen={setOpen} />
      !loading && <SideMenu open={open} setOpen={setOpen} />
      {!loading ? (
        <Main open={open}>
          <TabMenu />
        </Main>
      ) : (
        <Loader/>
      )}
    </div>
  );
};

export default Home;
