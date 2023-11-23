import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #805e73;
`;

export const FormContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  color: #87bcde;
  font-size: 24px;
`;

export const Subtitle = styled.p`
  color: #87bcde;
  font-size: 14px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const InputLabel = styled.label`
  color: #87bcde;
  font-size: 16px;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #243b4a;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const TogglePassword = styled.span`
  color: #87bcde;
  font-size: 14px;
  cursor: pointer;
`;
