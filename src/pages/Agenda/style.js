import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  padding-top: 130px;
  justify-content: top;
  padding: 20px;
  background-color: #f4f4f4;
`;

export const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
  color: #333;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  width: 100%;
`;

export const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #555;
`;

export const Step = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin: 10px 0;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const StepTitle = styled.h4`
  font-size: 1.25rem;
  margin-bottom: 10px;
  color: #333;
`;

export const StepDescription = styled.a`
  font-size: 1rem;
  color: #666;
`;


export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 colunas */
  gap: 20px;
  margin-top: 20px;
`;
 

export const Card = styled.div`
  background-color: ${({ status }) => (status === "available" ? "#ffffff" : "rgb(51, 222, 36);")}; 
  color: #333;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: background-color 0.3s ease;
  margin: 20px;
  &:hover {
    background-color: ${({ status }) => (status === "available" ? "#f9f9f9" : "#ff9999")}; 
  }
`;


export const MonthControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  button {
    background-color: rgb(60, 57, 57);;
    color: white;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 5px;
    margin: 0 10px;

    &:hover {
      background-color:  rgb(83, 80, 80);;
    }
  }

  span {
    font-size: 18px;
    font-weight: bold;
  }
`;

export const ServiceGroup = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

export const ServiceTitle = styled.h3`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`;

export const DateGroup = styled.div`
  margin-top: 10px;
  padding: 10px;
  border-radius: 8px;
  background-color: #f1f1f1;
`;

export const DateTitle = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const TimeList = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const ServiceControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;

  button {
    padding: 8px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
  }

  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
