import styled from 'styled-components';

interface ContainerProps {
  color: string;
  textColor: string;
}

export const Container = styled.div<ContainerProps>`
  position: relative;

  > span {
    background: ${(prop) => prop.color};
    color: ${(prop) => prop.textColor};
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.182405);

    padding: 8px;
    border-radius: 4px;

    font-size: 14px;
    font-weight: 500;
    text-align: center;

    visibility: hidden;
    opacity: 0;
    position: absolute;

    width: 160px;
    bottom: calc(100% + 12px);
    /* Horizontally align to the center */
    left: 50%;
    transform: translateX(-50%);

    transition: opacity 0.4s;

    &:before {
      content: '';

      width: 0;
      height: 0;

      display: block;
      position: absolute;

      border: 8px solid transparent;
      border-top: 8px solid ${(prop) => prop.color};
      border-bottom: none;

      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;
