import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: top;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
  background-color: #f4f4f4;
  margin-top: 100px;
`;

export const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  width: 100%;
`;

export const Subtitle = styled.h3`
  font-size: 1.0rem;
  margin-bottom: 20px;
  color: #555;
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ContactItem = styled.div`
  margin: 10px 0;
`;

export const ContactLabel = styled.span`
  font-weight: bold;
  font-size: 0.9rem;
  color: #333;
`;

export const ContactDetail = styled.a`
  font-size: 0.9rem;
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
