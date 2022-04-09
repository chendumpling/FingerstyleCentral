import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import "./technique-styling.css"
import { Explanation, DarkBackground, VideoContainer } from "./technique-styling"
import { LiteYoutubeEmbed } from 'react-lite-yt-embed';
import Save from '../components/Save';
import styled from '@emotion/styled';
import { v } from '../styles/variables';
import ReactTooltip from 'react-tooltip';

const extractVideoURL = (demo) => {
  return demo?.match(/^https?:\/\/.*(?:youtu.be\/|v\/|u\/\\w\/|embed\/|watch?v=)([^#&?]*).*$/)[1]
}
const EmbedContainer = styled.div`
  border-radius: ${v.borderRadius};
  overflow: hidden;
  position: relative;
`
const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: top;
  h2 {
    margin-bottom: 0.1em;
  }
  margin: 0 !important;
`
const AddedText = styled.span`
  display: inline-flex;
  align-items: center;
  margin-top:0.25em;
  h4 {
    margin-top: -0.15em;
    margin-right: 0.5em;
  }
`
const PageHeader = styled.div`
  margin-bottom: 1em;
`
const TechniqueName = styled.h2`
  margin-bottom: 0;
`
const ExerciseLinks = styled.ul`
  margin-bottom: 0.5em;
  li {
    display: flex;
    align-items: center;
    margin: 5px 0;
  }
`
function TechniqueDetails({ data }) {
  const { html } = data.allInfo;
  const {
    id, title, demo, slug, exercises, prereqs, category
  } = data.allInfo.frontmatter;
  return (
    <Layout>

      <div>
        <HeadingContainer>
          <PageHeader>
            <TechniqueName>{title}</TechniqueName>
            <span>
              Reqs:{" "}
              {prereqs ?
                prereqs.map((prereq, index) => (
                  <span key={index}>
                    {index > 0 && ", "}
                    <a href={prereq.slug}>{prereq.name}</a>
                  </span>
                ))
                :
                <span> None</span>}
            </span>

          </PageHeader>
          <span>
            <AddedText>
              <h4>Saved</h4>
              <Save id={id} />
            </AddedText>
          </span>
        </HeadingContainer>
        <VideoContainer>
          {demo &&
            <EmbedContainer>
              <LiteYoutubeEmbed id={extractVideoURL(demo)} isMobile={true} mute={false} />
            </EmbedContainer>
          }
        </VideoContainer>
        <Explanation>

          {html ?
            <div dangerouslySetInnerHTML={{ __html: html }} />
            :
            <p>This page has no content.</p>
          }
        </Explanation>

        <DarkBackground>
          <h4>Tabs</h4>
          {exercises ?
            exercises.map(({ text, link, slce }) => (
              <React.Fragment key={text}>
                <ExerciseLinks>
                  <li><span>{text}:{" "}<a href={link}>PDF</a></span></li>
                </ExerciseLinks>
              </React.Fragment>
            ))
            :
            <p>There are no tabs.</p>
          }
        </DarkBackground>
        <ReactTooltip />
      </div>

    </Layout >
  );
}

export const query = graphql`
  query TechniquesOne($slug: String) {
    allInfo: markdownRemark(frontmatter: {slug: {eq: $slug}}) {
      html
      frontmatter {
        id
        group
        title
        demo
        slug
        prereqs {
          name
          slug
        }
        artists
        category
        exercises {
          link
          text
          slce
        }
        tags
        description
      }
    }
  }
`

export default TechniqueDetails;
