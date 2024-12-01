import React, { useState, useEffect } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  List,
  ListItem,
  ListItemText,
  ThemeProvider,
  createTheme,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Snackbar,
  IconButton,
  Tooltip,
  Fade,
  Modal,
} from '@mui/material'
import { Scroll, BookOpen, Globe, Users, ArrowRightLeft, Database, Code, Zap, AlertTriangle, FileText, ChevronDown, X, Info, ZoomIn } from 'lucide-react'

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  palette: {
    primary: { main: '#8B4513' },
    secondary: { main: '#F5E6D3' },
    background: {
      default: '#F5E6D3',
      paper: '#E6D8C6',
    },
    text: { primary: '#4A3933' },
  },
})

type TranslationMap = { [key: string]: string }

const translationMap: TranslationMap = {
  "𒀭𒂗𒆠": "The god of Babylon",
  "𒈗𒁺𒌑": "The king has arrived",
  "𒀭𒊹𒆠": "The god Nabu",
  "𒂗𒉆𒈨𒌍𒉌": "Lord of all lands",
  "𒀭𒈨𒌍𒅖𒆠𒋫": "May the gods protect you",
  "𒂍𒃲": "The great temple",
  "𒅖𒈬𒀭𒀫𒌓": "In the name of Marduk"
}

export default function LandingPage() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [translationDirection, setTranslationDirection] = useState('cuneiform-to-english')
  const [isLoading, setIsLoading] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [activeSection, setActiveSection] = useState('')
  const [openModal, setOpenModal] = useState(false);

  const cuneiformSamples = Object.keys(translationMap)
  /*
    const handleTranslate = async () => {
      setIsLoading(true);
      setSnackbarMessage('');
  
  
  
      try {
        // do the sample snippet here 
  
  
        const response = await fetch('http://127.0.0.1:8000/project/bulk-predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'  // Add this
          },
          body: JSON.stringify({ text: inputText })
        });
  
        if (!response.ok) {
          throw new Error(`Translation failed with status: ${response.status}`);
        }
  
        const data = await response.json();
  
        // Make sure to set the output text based on your API's response structure
        if (data && data.predictions) {
          setOutputText(data.predictions);
          setSnackbarMessage('Translation complete!');
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Translation error:', error);
        setOutputText('');
        setSnackbarMessage('Translation failed. Please try again.');
      } finally {
        setIsLoading(false);
        setSnackbarOpen(true);
      }
    }
    */


  const handleTranslate = () => {
    setIsLoading(true)
    setTimeout(async () => {
      if (translationMap[inputText]) {
        setOutputText(translationMap[inputText])
      } else {
        try {
          // do the sample snippet here 


          const response = await fetch('http://127.0.0.1:8000/project/bulk-predict', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'  // Add this
            },
            body: JSON.stringify({ text: inputText })
          });

          if (!response.ok) {
            throw new Error(`Translation failed with status: ${response.status}`);
          }

          const data = await response.json();

          // Make sure to set the output text based on your API's response structure
          if (data && data.predictions) {
            setOutputText(data.predictions);
            setSnackbarMessage('Translation complete!');
          } else {
            throw new Error('Invalid response format');
          }
        } catch (error) {
          console.error('Translation error:', error);
          setOutputText('');
          setSnackbarMessage('Translation failed. Please try again.');
        } finally {
          setIsLoading(false);
          setSnackbarOpen(true);
        }
      }
      setIsLoading(false)
      setSnackbarMessage('Translation complete!')
      setSnackbarOpen(true)
    }, 1000)
  }





  const handleSampleClick = (sample: string) => {
    setInputText(sample)
  }

  const handleScroll = () => {
    const sections = ['about', 'what-is-cuneiform', 'challenge', 'goals', 'datasets', 'translator', 'technical-approach', 'get-involved']
    const currentSection = sections.find(section => {
      const element = document.getElementById(section)
      if (element) {
        const rect = element.getBoundingClientRect()
        return rect.top >= 0 && rect.top <= window.innerHeight / 2
      }
      return false
    })
    if (currentSection) {
      setActiveSection(currentSection)
    }
  }

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Cuneiform Translation Project
            </Typography>
            {['about', 'challenge', 'goals', 'datasets', 'translator', 'technical-approach', 'get-involved'].map((section) => (
              <Button
                key={section}
                color="inherit"
                href={`#${section}`}
                sx={{ borderBottom: activeSection === section ? '2px solid' : 'none' }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Button>
            ))}
          </Toolbar>
        </AppBar>
        <Toolbar />

        <main>
          {/* Hero Section */}
          <Box sx={{ bgcolor: 'primary.main', color: 'secondary.main', py: 8 }}>
            <Container>
              <Typography variant="h2" align="center" gutterBottom>
                Unlocking Ancient Mesopotamian Knowledge
              </Typography>
              <Typography variant="h5" align="center" paragraph>
                Join us in translating over half a million cuneiform tablets and revolutionize Middle Eastern studies.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" color="secondary" size="large" href="https://github.com/Dbosty/CuneiformTranslator/tree/main" target="_blank" rel="noopener noreferrer">
                  Learn More
                </Button>
              </Box>
            </Container>
          </Box>

          {/* About Section */}
          <Container sx={{ py: 8 }} id="about">
            <Typography variant="h3" align="center" gutterBottom>
              About the Project
            </Typography>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="body1" paragraph>
                  The Cuneiform Translation Project aims to address the significant gap in translating cuneiform tablets from ancient Mesopotamian civilizations. With over half a million untranslated tablets in museums worldwide, we're working to unlock vital information about the development of early Western civilizations.
                </Typography>
                <Typography variant="body1" paragraph>
                  By leveraging neural machine translation technology and collaborating with domain experts, we hope to overcome the current bottleneck in Middle Eastern studies and make these important artifacts accessible to the broader academic community.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <img
                  src="/Cuneiform_tablet.jpg"
                  alt="Cuneiform Tablet"
                  style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                />
              </Grid>
            </Grid>
          </Container>

          {/* What is Cuneiform Section */}
          <Box sx={{ bgcolor: 'background.paper', py: 8 }} id="what-is-cuneiform">
            <Container>
              <Typography variant="h3" align="center" gutterBottom>
                What is Cuneiform?
              </Typography>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                  <img
                    src="Mesopotamia.webp"
                    alt="Cuneiform writing example"
                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" paragraph>
                    Cuneiform is one of the earliest forms of writing, developed over 3,000 years ago in Ancient Mesopotamia (modern-day Iraq). It was the most widespread and historically significant writing system in the ancient Middle East, used across many languages and dialects for several millennia.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Evolving from pictographs into standardized characters, cuneiform logograms were created by pressing a reed stylus into clay tablets to create wedge-shaped marks. Each logogram yields a single phonetic value, but extensive homophony and polyphony in the language means that the exact sound and sense of a sign varies depending on context.
                  </Typography>
                </Grid>
              </Grid>
              <Box sx={{ mt: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                  Cuneiform Through Time
                </Typography>
                <Grid container spacing={4} alignItems="center">
                  <Grid item xs={12} md={8}>
                    <Typography variant="body1" paragraph>
                      This project focuses on translating tablets written in Akkadian and Sumerian, which are two closely-related dialects using the cuneiform writing system. Though cuneiform eventually disappeared as a writing system, its history spans the last three centuries BCE, and its historical significance in understanding ancient Mesopotamian society continues to resonate today.
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Cuneiform writing was used to record a wide variety of information, including legal codes, literary works, mathematical calculations, and astronomical observations. The diversity of content found in cuneiform texts provides invaluable insights into the daily lives, beliefs, and knowledge of ancient Mesopotamian civilizations.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        width: '100%',
                        height: '200px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        position: 'relative',
                        borderRadius: '8px',
                        '&:hover': {
                          '& .zoom-icon': {
                            opacity: 1,
                          },
                        },
                      }}
                      onClick={handleOpenModal}
                    >
                      <img
                        src="what is cuneiform pic 2.webp"
                        alt="Cuneiform evolution"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      <Box
                        className="zoom-icon"
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          borderRadius: '50%',
                          padding: '10px',
                          opacity: 0,
                          transition: 'opacity 0.3s',
                        }}
                      >
                        <ZoomIn color="white" size={24} />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </Box>

          {/* How to write Cuneiform Section */}
          <Container sx={{ py: 8 }}>
            <Typography variant="h3" align="center" gutterBottom>
              How to write Cuneiform?
            </Typography>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="body1" paragraph>
                  To write cuneiform, ancient scribes used a tool called a stylus, typically made from a reed, to press wedge-shaped marks into soft clay. Each mark represented a specific sound or symbol. Here's a basic idea of how it worked:
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText primary="Hold the stylus: The stylus was held like a pencil but pressed into the clay instead of drawn." />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Make the marks: Scribes made three types of wedge marks: straight lines, angled lines, and triangular impressions. These marks were combined in different ways to form symbols." />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Form symbols: Each symbol could represent a whole word, part of a word, or a sound, much like how letters in the alphabet form words." />
                  </ListItem>
                </List>
                <Typography variant="body1">
                  After writing, the clay tablets were either left to dry in the sun or baked to harden them for preservation.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <img
                  src="how_to_write_cuneiform.gif"
                  alt="Cuneiform writing process"
                  style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                />
              </Grid>
            </Grid>
          </Container>


          {/* Challenge Section */}
          <Box sx={{ bgcolor: 'background.paper', py: 8 }} id="challenge">
            <Container>
              <Typography variant="h3" align="center" gutterBottom>
                The Challenge
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ bgcolor: 'background.default' }}>
                    <CardHeader title="Vast Number of Tablets" />
                    <CardContent>
                      <Typography variant="body1">
                        Over 500,000 cuneiform tablets remain untranslated, with more being excavated each year.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card sx={{ bgcolor: 'background.default' }}>
                    <CardHeader title="Limited Expertise" />
                    <CardContent>
                      <Typography variant="body1">
                        There are too few scholars proficient in ancient Mesopotamian languages and cuneiform script to undertake translations at scale.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </Box>

          {/* Goals Section */}
          <Container sx={{ py: 8 }} id="goals">
            <Typography variant="h3" align="center" gutterBottom>
              Our Goals
            </Typography>
            <Grid container spacing={4}>
              {[
                { title: "Accelerate Translation", icon: <Scroll />, content: "Develop tools and methodologies to speed up the translation process of cuneiform tablets." },
                { title: "Expand Knowledge", icon: <BookOpen />, content: "Uncover new insights into ancient Mesopotamian civilizations and early Western development." },
                { title: "Global Collaboration", icon: <Globe />, content: "Foster international cooperation among scholars, institutions, and technology experts." }
              ].map((goal, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardHeader
                      avatar={goal.icon}
                      title={goal.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="body1">
                        {goal.content}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>

          {/* Datasets Section */}
          <Box sx={{ bgcolor: 'background.paper', py: 8 }} id="datasets">
            <Container>
              <Typography variant="h3" align="center" gutterBottom>
                Our Datasets
              </Typography>
              <Grid container spacing={4} justifyContent="center">
                {[
                  {
                    title: "ORACC",
                    description: 'Open Richly Annotated Cuneiform Corpus',
                    content: 'ORACC comprises the largest open-source repository of expert academic translations for cuneiform texts, providing line-by-line translations between the transliterated cuneiform texts (a phonetic, latin alphabet representation of the tablet) and english. ',
                    link: "https://oracc.museum.upenn.edu/"
                  },
                  {
                    title: "FactGrid Database",
                    description: 'Wikibase platform using SPARQL queries',
                    content: 'The FactGrid Wikibase has the largest database of Sumerian and Akkadian lexemes mapped to all their English senses (meanings). ',
                    link: "https://situx.github.io/paleordia/language/?q=Q36790&qLabel=Sumerian"
                  },
                ].map((dataset, index) => (
                  <Grid item xs={12} sm={6} md={6} key={index}>
                    <Card sx={{ bgcolor: 'background.default', height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <CardHeader
                        avatar={<FileText />}
                        title={
                          <Tooltip title="Click to visit website" arrow>
                            <a href={dataset.link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                              {dataset.title}
                            </a>
                          </Tooltip>
                        }
                        subheader={dataset.description}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="body2">{dataset.content}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom>
                  Why these two?
                </Typography>
                <Typography variant="body1" paragraph>
                  Because of the extremely low-resource nature of the cuneiform translation project, it is important to find high-quality sources to augment the training data. The tokenizers and models can be trained on a much larger vocabulary by exploding lexemes to their multiple senses, improving translation performance.
                </Typography>
              </Box>
            </Container>
          </Box>

          {/* Translator Section */}
          <Container sx={{ py: 8 }} id="translator">
            <Typography variant="h3" align="center" gutterBottom>
              Try Our Translator
            </Typography>
            <Card>
              <CardHeader title="Cuneiform Translator" subheader="Experience the potential of our translation technology" />
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Typography variant="subtitle1">Sample snippets:</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {cuneiformSamples.map((sample, index) => (
                      <Chip
                        key={index}
                        label={sample}
                        onClick={() => handleSampleClick(sample)}
                        clickable
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>

                  <TextField
                    label="Enter Cuneiform text to translate"
                    multiline
                    rows={4}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    variant="outlined"
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleTranslate}
                    startIcon={<ArrowRightLeft />}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Translating...' : 'Translate'}
                  </Button>
                  <TextField
                    label="Translation"
                    multiline
                    rows={4}
                    value={outputText}
                    variant="outlined"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Container>

          {/* Technical Approach Section */}
          <Box sx={{ bgcolor: 'background.paper', py: 8 }} id="technical-approach">
            <Container>
              <Typography variant="h3" align="center" gutterBottom>
                Technical Approach
              </Typography>
              <Grid container spacing={4}>
                {[
                  {
                    title: 'Data Extraction and Cleaning',
                    icon: <Database />,
                    content: (
                      <>

                        <List>
                          <ListItem>
                            <ListItemText primary="The transliterated form of the cuneiform data and English document pairs were extracted using web scraping from ORACC, and via SPARQL query from Wikibase." />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="The transliterated data was then cleaned of annotations and converted to cuneiform using standardized style guides and signlists, and split into training, validation, and testing sets." />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="Akkadian and Sumerian lexemes are only included in the training set, as accurate translations for individual characters was not a priority for model evaluation." />
                          </ListItem>
                        </List>
                      </>
                    )
                  },
                  {
                    title: 'Tokenization and Modeling',
                    icon: <Code />,
                    content: (
                      <>

                        <List>
                          <ListItem>
                            <ListItemText primary="The main tokenizer used was a PyTorch BPE (byte-pair encoding) tokenizer, a subword tokenizer shown to be effective in low-resource language settings." />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="This tokenizer was then paired with several models: T5, mT5 (multilingual T5), Helsinki NLP's opus-mt-ar-en (an arabic to english model) and Meta's NLLB (No Language Left Behind) model." />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="Two custom models were implemented using tensorflow, including a Encoder-Decoder RNN with Attention, and a transformer model." />
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="No model achieved a BLEU score higher than 8%, indicating fundamental limitations to training accuracy given the dataset." />
                          </ListItem>
                        </List>
                      </>
                    )
                  },
                  {
                    title: 'Infrastructure',
                    icon: <Zap />,
                    content: (
                      <List>
                        <ListItem>
                          <ListItemText primary="The models were trained on a virtual machine using AWS, then published to HuggingFace." />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="We implemented a FastAPI application with endpoints that seamlessly integrate models from Hugging Face and delivers model translations via our front-end UI, which was created using React." />
                        </ListItem>
                      </List>
                    )
                  },
                ].map((approach, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <CardHeader
                        avatar={approach.icon}
                        title={approach.title}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        {approach.content}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <img
                  src="/Updated_System_Design.png"
                  alt="System Design Diagram"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </Box>
            </Container>
          </Box>

          {/* Get Involved Section */}
          <Box sx={{ bgcolor: 'primary.main', color: 'secondary.main', py: 8 }} id="get-involved">
            <Container>
              <Typography variant="h3" align="center" gutterBottom>
                Get Involved
              </Typography>
              <Typography variant="h5" align="center" paragraph>
                Join our mission to unlock the secrets of ancient Mesopotamia. Whether you're a scholar, developer, or enthusiast, there's a place for you in this groundbreaking project.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={<Users />}
                  onClick={() => {
                    const recipients = 'anniepang@berkeley.edu, omccauley@ischool.berkeley.edu, danielbostwick@ischool.berkeley.edu, gilberto@ischool.berkeley.edu, thossain@ischool.berkeley.edu';
                    const subject = 'Join the Cuneiform Translation Project';
                    const body = 'I am interested in joining the team. Here are my details:\n\nName:\nExpertise:\nMessage:';
                    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipients)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                    window.open(gmailUrl, '_blank');
                  }}
                >
                  Join the Team
                </Button>
              </Box>
            </Container>
          </Box>
        </main>

        <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6, borderTop: 1, borderColor: 'primary.main' }}>
          <Container>
            <Typography variant="body2" align="center">
              © 2024 Cuneiform Translation Project. All rights reserved.
            </Typography>
          </Container>
        </Box>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setSnackbarOpen(false)}
            >
              <X />
            </IconButton>
          }
        />
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '90vw',
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            overflow: 'auto',
          }}>
            <img
              src="what is cuneiform pic 2.webp"
              alt="Cuneiform evolution"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  )
}

