import React,{useState , useEffect} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function InwardData() {
  const navigate  = useNavigate()
  const [info, setInfo] = useState()
  const [ToggleBtn, setToggleBtn] = useState(false)
  const [Data, setData] = useState({
    commodity:"",
    purchase_quantity:"",
    purchase_rate:"",
    total_purchase:""
  })
  const [farmersData, setFarmersData] = useState({
    farmers_market:"",
    farmer_name :"",
    mobile_num:"",
    data:[Data]
  })


  const callInfo = async() =>{
    try {
      const res = await fetch("/info",{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      })

      const data = await res.json();
      setInfo(data)

      if(!res.status === 200){
        throw new Error(res.error);
      }

    } catch (error) {
      navigate("./")
    }
  }

  useEffect(() => {
    callInfo();//eslint-disable-next-line
  }, [])

  useEffect(() => {
    setFarmersData((prevState)=>({
      ...prevState,
      data:Data
    }))
  }, [Data])
  

  
  const handleAddData = async(e) =>{

  }

  const handleFarmerData = (e)=>{
    const {name , value} = e.target
    setFarmersData(prevState => ({
      ...prevState,
      [name]:value
  }))
  }
  const handleFarmer = (e)=>{
    const {name , value} = e.target
    setData(prevState => ({
      ...prevState,
      [name]:value
    }))
  }

   
  const handleInput=(e)=>{
    if(e.target.value!==""){
      setToggleBtn(true)
    }else{
      setToggleBtn(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding:1
          }}
        >
          <Typography component="h1" variant="h4">
           Farmer Inward Data
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{marginTop:2 , boxShadow: "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset" ,padding:3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="farmer_name"
                  value="fname"
                  required
                  fullWidth
                  type="text"
                  id="farmer_name"
                  label="Farmer Name"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  
                  fullWidth
                  name="mobile_num"
                  label="Mobile Number"
                  value="phone"
                  type="number"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="farmers_market"
                  label="Farmers Market"
                  value="market"
                  onChange={handleFarmerData}
                  onInput={handleInput}
                  type="text"
                  id="farmers_market"
                  autoComplete="new-farmers market"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="commodity"
                  value="commodity"
                  onChange={handleFarmer}
                  label="Commodity"
                  type="text"
                  id="commodity"
                  autoComplete="new-commodity"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="purchase_quantity"
                  value="quantity"
                  onChange={handleFarmer}
                  label="Purchase Quantity"
                  type="number"
                  id="purchase quantity"
                  autoComplete="new-purchase quantity"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="purchase_rate"
                  value="purchase rate"
                  onChange={handleFarmer}
                  label="Purchase Rate"
                  type="number"
                  id="purchase rate"
                  autoComplete="new-purchase rate"
                />
              </Grid>
            </Grid>
            <Grid>
            {ToggleBtn?<Button
              type="submit"
              variant="contained"
              sx={{ m:2 }}
              onClick={handleAddData}
            >
              Add
            </Button>:<Button
              type="submit"
              disabled
              variant="contained"
              sx={{ m:2 }}
              onClick={handleAddData}
            >
              Add
            </Button>}
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </>
  );
}