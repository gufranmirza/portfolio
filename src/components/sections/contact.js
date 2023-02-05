import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig, email } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledContactSection = styled.section`
  margin: 0 auto 100px;
  padding: 100px 0px 50px 0px;

  h2 {
    color: var(--slate-dark);
  }

  p {
    max-width: 900px;
  }

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .contact {
    text-align: center;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin: 80px auto 0;
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading">Get In Touch</h2>

      <p>
        Although I’m not currently looking for any new opportunities, my inbox is always open.
        Whether you have a question or just want to have discussion about some cool tech trend or a
        product, feel free to drop me a message, I’ll try my best to get back to you!
      </p>

      <div className="contact">
        <a className="email-link" href={`mailto:${email}`}>
          Say Hello
        </a>
      </div>
    </StyledContactSection>
  );
};

export default Contact;
