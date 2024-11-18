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
} from '@mui/material'
import {
  Scroll,
  BookOpen,
  Globe,
  Users,
  ArrowRightLeft,
  Database,
  Code,
  Zap,
  AlertTriangle,
  FileText,
  ChevronDown,
  X,
  Info,
} from 'lucide-react'

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
  "The king of Babylon": "𒈗𒆠𒂗𒁺",
  "May the gods protect you": "𒀭𒈨𒌍𒅖𒆠𒋫",
  "The great temple": "𒂍𒃲",
  "In the name of Marduk": "𒅖𒈬𒀭𒀫𒌓",
}

export default function LandingPage() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [translationDirection, setTranslationDirection] = useState('cuneiform-to-english')
  const [isLoading, setIsLoading] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [activeSection, setActiveSection] = useState('')

  const cuneiformSamples = Object.keys(translationMap).filter(key => /[\u{12000}-\u{123FF}]/u.test(key))
  const englishSamples = Object.keys(translationMap).filter(key => !/[\u{12000}-\u{123FF}]/u.test(key))

  const handleTranslate = async () => {
    setIsLoading(true);
    setSnackbarMessage('');
    
    try {
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
        <Toolbar /> {/* Add this to offset the fixed AppBar */}

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
                <Button variant="contained" color="secondary" size="large" href="#about">
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
                  The Cuneiform Translation Project aims to address the significant gap in translating cuneiform tablets from ancient Mesopotamian civilizations. With over half a million untranslated tablets in museums worldwide, we're working to unlock vital information about the early development of Western civilizations.
                </Typography>
                <Typography variant="body1" paragraph>
                  By leveraging technology and collaboration, we hope to overcome the current bottleneck in Middle Eastern studies and make these important artifacts accessible to the broader academic community.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <img
                  src="/Cuneiform tablet.jpg"
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
                    Cuneiform is one of the earliest forms of writing, developed over 5,000 years ago in ancient Mesopotamia (modern-day Iraq). It involved pressing a reed stylus into clay tablets to create wedge-shaped marks, which were used to record things like trade, laws, and stories. These tablets offer a glimpse into the daily lives and cultures of ancient civilizations.
                  </Typography>
                </Grid>
              </Grid>
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
              <Grid container spacing={4}>
                {[
                  {
                    title: "ORACC",
                    description: 'Open Richly Annotated Cuneiform Corpus',
                    content: 'Primary source of annotated and reliable training data.',
                    link: "https://oracc.museum.upenn.edu/"
                  },
                  {
                    title: "CDLI",
                    description: 'Cuneiform Digital Library Initiative',
                    content: 'Extensive corpus of manually translated cuneiform texts.',
                    link: "https://cdli.mpiwg-berlin.mpg.de/artifacts/359543"
                  },
                  {
                    title: "FactGrid Database",
                    description: 'Wikibase platform using SPARQL queries',
                    content: 'Augments training data with structured historical knowledge.',
                    link: "https://situx.github.io/paleordia/language/?q=Q36790&qLabel=Sumerian"
                  },
                  {
                    title: "AICC",
                    description: 'AI Cuneiform Corpus',
                    content: 'Used for selecting hallucination-free translations and benchmarking performance with BLEURT.',
                    link: "https://aicuneiform.com/search?q=P359543"
                  },
                ].map((dataset, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
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
                  <FormControl fullWidth>
                    <InputLabel>Translation Direction</InputLabel>
                    <Select
                      value={translationDirection}
                      onChange={(e) => setTranslationDirection(e.target.value as string)}
                      label="Translation Direction"
                    >
                      <MenuItem value="cuneiform-to-english">Cuneiform to English</MenuItem>
                      <MenuItem value="english-to-cuneiform">English to Cuneiform</MenuItem>
                    </Select>
                  </FormControl>

                  <Typography variant="subtitle1">Sample snippets:</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {(translationDirection === 'cuneiform-to-english' ? cuneiformSamples : englishSamples).map((sample, index) => (
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
                    label="Enter text to translate"
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
                  { title: 'Data Engineering', icon: <Database />, content: ['Implement pipeline for efficient text tokenization', 'Experiment with different tokenizers for cuneiform language', 'Explore sentence-level and word-level tokenizations', 'Use professional translations as desired outputs'] },
                  { title: 'Modeling', icon: <Code />, content: ['Utilize t5 model from HuggingFace', 'Apply transfer learning and fine-tuning techniques', 'Explore Facebook\'s NLLB model for low-resource languages', 'Create and evaluate different output embeddings'] },
                  { title: 'Evaluation', icon: <Zap />, content: ['Match model translations with researcher translations', 'Utilize ROUGE and BLEU scores for evaluation', 'Implement BLEURT for benchmarking performance'] },
                  { title: 'Efficiency', icon: <AlertTriangle />, content: ['Leverage cloud computing resources (AWS)', 'Implement DevOps for training and evaluation processes', 'Use Weights & Biases (wandb) for model weights storage', 'Utilize SageMaker for efficient inference and translations'] },
                ].map((approach, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ChevronDown />}
                        aria-controls={`panel${index}a-content`}
                        id={`panel${index}a-header`}
                      >
                        <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                          {React.cloneElement(approach.icon, { style: { marginRight: '8px' } })}
                          {approach.title}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <List>
                          {approach.content.map((item, i) => (
                            <ListItem key={i}>
                              <ListItemText primary={item} />
                            </ListItem>
                          ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ mt: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                  System Design
                </Typography>
                <Typography variant="body1" align="center">
                  Our system leverages various data sources, processes them through Text Fabric,
                  fine-tunes a Hugging Face t5 model, and deploys via API to a front-end interactive UI.
                  All training and evaluation is powered by AWS.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <img
                    src="/System design diagram.png"
                    alt="System Design Diagram"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </Box>
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
                    setSnackbarMessage('Thank you for your interest! We\'ll be in touch soon.')
                    setSnackbarOpen(true)
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
              © 2023 Cuneiform Translation Project. All rights reserved.
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
      </Box>
    </ThemeProvider>
  )
}