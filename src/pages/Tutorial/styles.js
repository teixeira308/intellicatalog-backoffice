import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
  padding-top:80px;
  background-color: #f4f4f4;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const CardHeader = styled.div`
  background-color: #333;
  color: #fff;
  font-weight: bold;
  padding: 15px;
  border-radius: 8px 8px 0 0;
`;

export const CardBody = styled.div`
  padding: 20px;
`;

export const Accordion = styled.div`
  margin-bottom: 20px;
`;

export const AccordionItem = styled.div`
  margin-bottom: 10px;
`;

export const AccordionHeader = styled.div`
  font-weight: bold;
  cursor: pointer;
  padding: 10px;
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const AccordionBody = styled.div`
  padding: 16px 30px;
  border: 1px solid #ddd;
  border-top: none;
  background-color: #fafafa;
  line-height: 2.0;
`;

export const VideoSection = styled.div`
  text-align: center;
  margin-top: 20px;
`;

export const VideoIframe = styled.iframe`
  border: none;
  border-radius: 8px;
`;

