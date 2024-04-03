import React, { useState } from "react";
import {TextField, Button} from "@mui/material";
import styles from "./Home.module.css";
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Home() {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {event.preventDefault();};

    const [formData, setFormData] = useState({
        
        username: "",
        password: ""

    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
      };

    const handleSubmit = async () => {
        console.log('Dados do formulário:', formData);
    
        try {
    
          const response = await fetch('http://10.10.6.72:5000/add-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            const result = await response.json();
            console.log(result.message);
          } else {
            console.error('Erro ao criar registro:', response.statusText);
          }
        } catch (error) {
          console.error('Erro durante a solicitação:', error);
        }
      };

return(
    <div className={styles.containerGlobal}>

        <div className={styles.containerBox}>
            <TextField 
                id="outlined-basic"
                label="Usuário"
                variant="outlined"
                name="username"
                value={formData.username}
                className={styles.customTextfield}
                onChange={handleInputChange}
            />

            <TextField 
                id="outlined-basic"
                label="Senha"
                variant="outlined"
                name="password"
                value={formData.password}
                className={styles.customTextfield}
                onChange={handleInputChange}
            />

            <Button variant="contained" onClick={handleSubmit}>CADASTRAR</Button>

        </div>


    </div>
)

}

export default Home;