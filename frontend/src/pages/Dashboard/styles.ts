import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 24px;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;
    padding: 12px;

    svg {
      color: #999591;
      width: 25px;
      height: 25px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #252330;
  }

  div {
    display: flex;
    flex-direction: column;

    line-height: 24px;
    margin-left: 16px;

    span {
      color: #999591;
    }

    a {
      text-decoration: none;
      color: #ff9000;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  padding: 0 24px;
  margin: 64px auto;
  display: flex;
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 12px;
    color: #ff9000;
    font-weight: 500;

    display: flex;
    align-items: center;
  }
`;

export const Separator = styled.span`
  background: #ff9000;
  width: 1px;
  height: 12px;
  margin: 0 8px;
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  p {
    color: #999591;
    font-size: 20px;
    font-weight: normal;
  }

  div {
    background: #3e3b47;
    border-radius: 10px;
    padding: 16px 24px;
    margin-top: 24px;

    display: flex;
    align-items: center;
    position: relative;

    &::before {
      position: absolute;
      height: 70%;
      width: 2px;
      left: 0;
      top: 15%;
      content: '';
      background: #ff9000;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }

    img {
      height: 80px;
      width: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #999591;

      svg {
        height: 20px;
        width: 20px;

        color: #ff9000;
        margin-right: 12px;
      }
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    display: block;

    color: #999591;
    font-size: 20px;
    padding-bottom: 16px;
    margin-bottom: 24px;

    border-bottom: 1px solid #3e3b47;
  }

  > p {
    color: #999591;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #f4ede8;
    width: 95px;

    svg {
      height: 20px;
      width: 20px;

      color: #ff9000;
      margin-right: 12px;
    }
  }

  div {
    background: #3e3b47;
    border-radius: 10px;
    padding: 16px;

    flex: 1;
    display: flex;
    align-items: center;

    img {
      height: 56px;
      width: 56px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      font-size: 20px;
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;

  .DayPicker {
    border-radius: 0.6rem;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    background: #3e3b47;
    border-radius: 0.6rem;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-NavButton {
    color: #999591 !important;
  }

  .DayPicker-NavButton--prev {
    right: auto;
    left: 1.5em;
    margin-right: 0;
  }

  .DayPicker-NavButton--next {
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 1rem 0 0 0;
    padding: 16px;
    background-color: #28262e;
    border-radius: 0 0 10px 10px;
  }

  .DayPicker-Caption {
    margin-bottom: 1rem;
    padding: 0 1rem;
    color: #f4ede8;

    > div {
      text-align: center;
    }
  }

  .DayPicker-Weekday {
    color: #666360;
  }

  .DayPicker-Day {
    width: 2.5rem;
    height: 2.5rem;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 0.6rem;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
    color: #fff;
  }

  .DayPicker-Day--disabled {
    color: #666360;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 0.6rem;
    color: #232129 !important;
  }
`;
