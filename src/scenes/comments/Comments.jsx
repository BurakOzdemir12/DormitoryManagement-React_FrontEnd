import React from "react";
import { Box, useTheme, Typography } from "@mui/material";
import Header from "../../Components/header/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
const Comments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return <Box>
       <Header
        title="Yorumlar"
        subtitle="Öğrencilerden Gelen Yorumlar Aşağıda Listelenmektedir"
      />
      <Accordion defaultExpanded>
       <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
       <Typography color={colors.greenAccent[500]} variant="h5" >
       Comments made by Burak Özdemir 
       </Typography>
       </AccordionSummary>
       <AccordionDetails>
              <Typography>
                     Yapılan Yorum Burada Yeralacak
              </Typography>
       </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
       <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
       <Typography color={colors.greenAccent[500]} variant="h5" >
       Comments made by Burak Özdemir 
       </Typography>
       </AccordionSummary>
       <AccordionDetails>
              <Typography>
                     Yapılan Yorum Burada Yeralacak
              </Typography>
       </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
       <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
       <Typography color={colors.greenAccent[500]} variant="h5" >
       Comments made by Burak Özdemir 
       </Typography>
       </AccordionSummary>
       <AccordionDetails>
              <Typography>
                     Yapılan Yorum Burada Yeralacak
              </Typography>
       </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
       <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
       <Typography color={colors.greenAccent[500]} variant="h5" >
       Comments made by Burak Özdemir 
       </Typography>
       </AccordionSummary>
       <AccordionDetails>
              <Typography>
                     Yapılan Yorum Burada Yeralacak
              </Typography>
       </AccordionDetails>
      </Accordion>
       </Box>;
};

export default Comments;
