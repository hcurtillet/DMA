import React, {useState} from 'react'
import { TouchableOpacity, View, Text } from 'react-native';
import { CenterContainer } from '../../components';
import {
    StyledEmailIcon,
    StyledPasswordIcon,
    StyledButton,
    StyledInput,
    StyledCard,
    StyledForm,
    StyledAlert,
    styles
  } from "./style";
import { useAuth } from '../../contexts/AuthProvider';

function Profile({navigation}) {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const {currentUser} = useAuth()
    async function handlelogout() {
        setError(""); // clean current error context
        try {
          await auth.signOut();
          navigation.replace('Login');
        } catch {
          setError("Failed to log out");
        }
      }

    return (
        <CenterContainer>
            <StyledCard>
            <Text style={styles.title}>Profile</Text>
            {error && <StyledAlert variant="danger">{error}</StyledAlert>}
                <StyledForm>
                    <StyledForm.Group id="icon">
                        <View style={styles.icon}>
                            {currentUser.email.charAt(0).toUpperCase()}
                        </View>
                        <Text>{currentUser.email}</Text>
                    </StyledForm.Group>

                    <StyledForm.Group id="logout">
                        <StyledButton
                        disabled={loading}
                        variant="danger"
                        onClick={handlelogout}
                        >
                        Logout
                        </StyledButton>
                    </StyledForm.Group>

                    <StyledForm.Group id="back">
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <Text style={styles.link}>Back</Text>
                            </TouchableOpacity>
                        </View>
                    </StyledForm.Group>

                </StyledForm>
            </StyledCard>
        </CenterContainer>
    )
}

export default Profile
