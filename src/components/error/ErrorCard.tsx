import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useErrorCardStyles } from './ErrorCardStyle';

export function ErrorCard({ error }: any) {
  const classes = useErrorCardStyles();

  const getErrorString = () => {
    if (error.constructor == ({}).constructor) return JSON.stringify(error, null, 2);
    return `${error}`;
  }

  return (
    <div className={classes.root}>
      <Card variant="elevation" elevation={5} className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              color="error"
              children="Error"
            />
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              children={error?.message || "Something went wrong"}
            />
          </CardContent>
        </CardActionArea>
        {error &&
          <CardActions >
            <Accordion >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading} children="Full error" />
              </AccordionSummary>
              <AccordionDetails className={classes.accordion}>
                <SyntaxHighlighter
                  wrapLines={true}
                  language="json"
                  style={a11yDark}
                  children={getErrorString()}
                />
              </AccordionDetails>
            </Accordion>
          </CardActions>
        }
      </Card>
    </div>
  );
}