import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { useEffect, useState } from "react";
import { Button, Input } from "@material-ui/core";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Header() {
  const [{ namee, emaill }, dispatch] = useStateValue();

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const [openl, setOpenl] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        dispatch({
          type: "SET_USER",
          namee: authUser.displayName,
        });
        dispatch({
          type: "SET_EMAIL",
          emaill: authUser.email,
        });
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, name]);
  console.log(namee, emaill);
  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: name,
        });
      })
      .catch((error) => alert(error.message));
    setOpen(false);
  };

  const logIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => alert(err.message));
    setOpenl(false);
  };

  const logout = () => {
    auth.signOut();
    window.location.reload();
  };

  const handleButtonnClick = () => {
    setOpenl(false);
    setOpen(true);
  };
  return (
    <div className="header">
      {/* For Login */}

      <Modal open={openl} onClose={() => setOpenl(false)}>
        <div style={modalStyle} className={classes.paper}>
          <center>
            <img
              src="data:image/png;base64,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"
              alt=""
            />
          </center>
          <form className="app__signup">
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button id="hello" type="submit" onClick={logIn}>
              LogIn
            </Button>
            <Button id="hello" onClick={handleButtonnClick}>
              Sign up
            </Button>
          </form>
        </div>
      </Modal>
      {/*  For Signup */}

      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <center>
            <img
              src="data:image/png;base64,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"
              alt=""
            />
          </center>
          <form className="app__signup">
            <Input
              placeholder="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button id="hello" type="submit" onClick={signUp}>
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>

      <Link to="/">
        <img
          className="header__img"
          src="data:image/png;base64,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"
          alt=""
        />
      </Link>
      <div className="header__search">
        <input type="text" placeholder="Find cars,mobile" />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__right">
        {user ? (
          <p>
            <h4>Hi,</h4>
            <h3>{namee}</h3>
          </p>
        ) : (
          <h3>Hi Guest</h3>
        )}
        <div className="header__rightSign">
          {user ? (
            <Button id="loginout" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button id="loginout" onClick={() => setOpenl(true)}>
              Login
            </Button>
          )}
          <Link to="/my">
            <Button id="loginout">My</Button>
          </Link>
          <Link to="/edit">
            <Button id="loginout">Edit</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
