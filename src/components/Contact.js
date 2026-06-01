import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { 
  FaEnvelope, 
  FaPhone, 
  FaLinkedin, 
  FaGithub, 
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
  FaWhatsapp
} from 'react-icons/fa';

const ContactContainer = styled.section`
  min-height: 100vh;
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #16213e 0%, #0a0a0a 50%, #1a1a2e 100%);
  position: relative;
  overflow: hidden;
`;

const ContactContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
`;

const ContactMainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  width: 100%;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactInfo = styled.div`
  z-index: 2;
  width: 100%;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Space Grotesk', sans-serif;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #8b5cf6;
  font-weight: 600;
  margin-bottom: 2rem;
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  color: #94a3b8;
  line-height: 1.8;
  margin-bottom: 3rem;
`;

const ContactMethodsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ContactMethod = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  text-decoration: none;
  color: #ffffff;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(99, 102, 241, 0.1);
    border-color: rgba(99, 102, 241, 0.3);
    box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);
  }
`;

const ContactIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
`;

const ContactDetails = styled.div`
  flex: 1;
`;

const ContactLabel = styled.div`
  font-size: 0.9rem;
  color: #8b5cf6;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const ContactValue = styled.div`
  font-size: 1.1rem;
  color: #ffffff;
  font-weight: 500;
`;

const FormContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  z-index: 2;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #ffffff;
  font-weight: 600;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #6366f1;
    background: rgba(99, 102, 241, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #6366f1;
    background: rgba(99, 102, 241, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const StatusMessage = styled(motion.div)`
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;

  &.success {
    background: rgba(34, 197, 94, 0.1);
    border: 1px solid rgba(34, 197, 94, 0.3);
    color: #22c55e;
  }

  &.error {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #ef4444;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const QuickContactSection = styled(motion.div)`
  margin: 2rem 0;
`;

const QuickContactTitle = styled.h4`
  font-size: 1.1rem;
  color: #8b5cf6;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const QuickContactButtons = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    overflow-x: visible;
    max-width: 100%;
  }
`;

const QuickContactButton = styled(motion.button)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  min-height: 120px;
  flex: 1;
  max-width: 200px;

  &:hover {
    transform: translateY(-5px);
    background: rgba(99, 102, 241, 0.1);
    border-color: rgba(99, 102, 241, 0.3);
    box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);
  }

  @media (max-width: 768px) {
    padding: 1rem;
    min-height: 100px;
    max-width: 100%;
    flex: none;
  }
`;

const QuickContactIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
`;

const QuickContactLabel = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.25rem;
`;

const QuickContactDescription = styled.div`
  font-size: 0.7rem;
  color: #94a3b8;
  line-height: 1.3;
  text-align: center;
`;

const SocialLink = styled(motion.a)`
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6366f1;
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(99, 102, 241, 0.1);
    border-color: rgba(99, 102, 241, 0.3);
    transform: translateY(-2px);
  }
`;


const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      // Create the message content
      const messageContent = `*New Message from Portfolio Contact Form*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Subject:* ${formData.subject}

*Message:*
${formData.message}

---
Sent from Atharva Desai's Portfolio Website`;

      // Encode the message for URL
      const encodedMessage = encodeURIComponent(messageContent);
      
      // Your WhatsApp number (replace with your actual number)
      const whatsappNumber = '919860874908'; // Your number without + sign
      
      // Create WhatsApp URL
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      // Create email URL
      const emailSubject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`);
      const emailBody = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`);
      const emailUrl = `mailto:desaiatharva20@gmail.com?subject=${emailSubject}&body=${emailBody}`;
      
      // Open both WhatsApp and email
      window.open(whatsappUrl, '_blank');
      window.open(emailUrl, '_blank');
      
      setStatus({
        type: 'success',
        message: 'Opening WhatsApp and Email... Please send the message from there!'
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to open messaging apps. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'desaiatharva20@gmail.com',
      href: 'mailto:desaiatharva20@gmail.com'
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: '(+91) 9860874908',
      href: 'tel:+919860874908'
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/atharva–desai',
      href: 'https://linkedin.com/in/atharva–desai'
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'Pune, Maharashtra, India',
      href: '#'
    }
  ];

  const quickContactMethods = [
    {
      icon: FaEnvelope,
      label: 'Email',
      description: 'Send me an email with your inquiry',
      action: () => {
        const emailUrl = 'mailto:desaiatharva20@gmail.com?subject=Hello from Portfolio&body=Hi Atharva, I came across your portfolio and would like to connect!';
        window.open(emailUrl, '_blank');
      }
    },
    {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      description: 'Send me a message directly on WhatsApp',
      action: () => {
        const whatsappUrl = 'https://wa.me/919860874908?text=Hi Atharva, I came across your portfolio and would like to connect!';
        window.open(whatsappUrl, '_blank');
      }
    },
    {
      icon: FaPhone,
      label: 'Call',
      description: 'Give me a call directly',
      action: () => {
        window.open('tel:+919860874908', '_self');
      }
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      description: 'Connect with me on LinkedIn',
      action: () => {
        window.open('https://www.linkedin.com/in/atharva--desai/', '_blank');
      }
    }
  ];

  return (
    <ContactContainer id="contact" ref={ref}>
      <ContactContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ width: '100%', textAlign: 'center' }}
        >
          <SectionTitle variants={itemVariants}>
            Get In Touch
          </SectionTitle>
          
          <SectionSubtitle variants={itemVariants}>
            Let's Build Something Amazing Together
          </SectionSubtitle>
          
          <Description variants={itemVariants}>
            I'm always excited to work on new Full Stack + AI systems and collaborate with amazing people. 
            Whether you have a question, want to work together, or just want to say hi, 
            I'd love to hear from you!
          </Description>

          <QuickContactSection variants={itemVariants}>
            <QuickContactTitle>Quick Contact</QuickContactTitle>
            <QuickContactButtons>
              {quickContactMethods.map((method, index) => (
                <QuickContactButton
                  key={index}
                  onClick={method.action}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <QuickContactIcon>
                    <method.icon />
                  </QuickContactIcon>
                  <QuickContactLabel>{method.label}</QuickContactLabel>
                  <QuickContactDescription>{method.description}</QuickContactDescription>
                </QuickContactButton>
              ))}
            </QuickContactButtons>
          </QuickContactSection>
        </motion.div>

        <ContactMainContent>
          <ContactInfo>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <ContactMethodsList>
                {contactMethods.map((method, index) => (
                  <ContactMethod
                    key={index}
                    href={method.href}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ContactIcon>
                      <method.icon />
                    </ContactIcon>
                    <ContactDetails>
                      <ContactLabel>{method.label}</ContactLabel>
                      <ContactValue>{method.value}</ContactValue>
                    </ContactDetails>
                  </ContactMethod>
                ))}
              </ContactMethodsList>

            </motion.div>
          </ContactInfo>

          <FormContainer
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Form onSubmit={handleSubmit}>
              {status && (
                <StatusMessage
                  className={status.type}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {status.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
                  {status.message}
                </StatusMessage>
              )}

              <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What's this about?"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="message">Message</Label>
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project or just say hello!"
                  required
                />
              </FormGroup>

              <SubmitButton
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="loading" />
                    Opening Apps...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send via WhatsApp & Email
                  </>
                )}
              </SubmitButton>
            </Form>
          </FormContainer>
        </ContactMainContent>
      </ContactContent>
    </ContactContainer>
  );
};

export default Contact;
