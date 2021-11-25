import React, { useState, useRef } from "react";
import { CenterContainer } from "../../components";
import { Alert } from "react-bootstrap";
import {
  StyledEmailIcon,
  StyledPasswordIcon,
  StyledButton,
  StyledInput,
  StyledCard,
  StyledTitle,
  StyledForm,
  StyledIcon,
  StyledCollapse,
} from "./style";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Center } from "@chakra-ui/react";
function Profile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, logout, updatePassword, updateEmail } = useAuth();
  const navigate = useNavigate();

  function goToHomePage() {
    navigate(-1);
  }

  async function handlelogout() {
    setError(""); // clean current error context
    try {
      await logout();
      navigate.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  function handleUpdate(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate.push("/login");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <div>
      <CenterContainer>
        <StyledTitle>Profile</StyledTitle>

        {error && <Alert variant="danger">{error}</Alert>}
        <StyledCard>
          <StyledCard.Body>
            <StyledIcon>
              {" "}
              {currentUser.email.charAt(0).toUpperCase()}{" "}
            </StyledIcon>
            {currentUser.email}

            <StyledForm.Group id="update">
              <StyledButton
                className="btn-secondary"
                onClick={() => setOpen(!open)}
              >
                Settings
              </StyledButton>

              <StyledCollapse in={open}>
                <StyledForm id="update-form">
                  <StyledInput id="email">
                    <StyledEmailIcon />
                    <StyledForm.Control
                      name="email"
                      placeholder={currentUser.email}
                      type="email"
                      ref={emailRef}
                    />
                  </StyledInput>

                  <StyledInput id="password">
                    <StyledPasswordIcon />
                    <StyledForm.Control
                      name="password"
                      placeholder="Blank remains unchanged"
                      type="password"
                      ref={passwordRef}
                    />
                  </StyledInput>

                  <StyledInput id="password-confirm">
                    <StyledPasswordIcon />
                    <StyledForm.Control
                      name="password-confirm"
                      placeholder="Password Confirm"
                      type="password"
                      ref={passwordConfirmRef}
                    />
                  </StyledInput>

                  <StyledButton
                    disabled={loading}
                    className="btn-secondary"
                    onClick={handleUpdate}
                  >
                    Update
                  </StyledButton>
                </StyledForm>
              </StyledCollapse>
            </StyledForm.Group>
            <StyledButton onClick={goToHomePage}>Back</StyledButton>
            <StyledButton
              disabled={loading}
              variant="danger"
              onClick={handlelogout}
            >
              Logout
            </StyledButton>
          </StyledCard.Body>
        </StyledCard>
      </CenterContainer>
    </div>
  );
}

export default Profile;
