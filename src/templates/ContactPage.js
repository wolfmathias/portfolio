import React from 'react'
import { Twitter, GitHub, Mail, Linkedin} from 'react-feather'
import { graphql } from 'gatsby'
import PageHeader from '../components/PageHeader'
import FormSimpleAjax from '../components/FormSimpleAjax'
import Content from '../components/Content'
import Layout from '../components/Layout'
import './ContactPage.css'

// Export Template for use in CMS preview
export const ContactPageTemplate = ({
  body,
  title,
  subtitle,
  featuredImage,
  email,
  github,
  twitter,
  linkedin
}) => (
  <main className="Contact">
    <PageHeader
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />
    <section className="section Contact--Section1">
      <div className="container Contact--Section1--Container">
        <div>
          <Content source={body} />
          <div className="Contact--Details">
            {github && (
              <a className="Contact--Details--Item" href={github}>
                <GitHub /> {'github.com/bigcatplichta'}
              </a>
            )}
            {twitter && (
              <a className="Contact--Details--Item" href={twitter}>
                <Twitter /> {'@mattplichtawild'}
              </a>
            )}
            {email && (
              <a className="Contact--Details--Item" href={`mailto:${email}`}>
                <Mail /> {email}
              </a>
            )}
            {linkedin && (
              <a className="Contact--Details--Item" href={linkedin}>
                <Linkedin /> {'linkedin.com/in/matt-plichta'}
              </a>
            )}
          </div>
        </div>

        <div>
          <FormSimpleAjax name="Simple Form Ajax" />
        </div>
      </div>
    </section>
  </main>
)

const ContactPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ContactPageTemplate {...page.frontmatter} body={page.html} />
  </Layout>
)

export default ContactPage

export const pageQuery = graphql`
  query ContactPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        template
        subtitle
        featuredImage
        email
        github
        twitter
        linkedin
      }
    }
  }
`
