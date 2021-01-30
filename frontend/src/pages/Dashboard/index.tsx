import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import * as Fi from 'react-feather';

import 'react-day-picker/lib/style.css';

import { Link } from 'react-router-dom';

import logoImg from '../../assets/img/logo.svg';
import { useAuth } from '../../context/AuthContext';
import { UserAppointment, getProviderAppointments } from '../../services/api/appointments';
import { getProviderMonthAvailability, MonthAvailabilityItem } from '../../services/api/providers';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  NextAppointment,
  Separator,
  Section,
  Appointment,
} from './styles';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [appointments, setAppointments] = useState<UserAppointment[]>([]);

  const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([]);

  const { user, signOut } = useAuth();

  const unavailableDays = useMemo(() => {
    const dates = monthAvailability
      .filter((month) => month.available === false)
      .map(({ day }) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const date = new Date(year, month, day);

        return date;
      });

    return dates;
  }, [monthAvailability, currentMonth]);

  const selectedDateInfo = useMemo(() => {
    const selectedDateIsToday = isToday(selectedDate);
    const selectedDateAsText = format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
    const selectedDateWeekDay = format(selectedDate, 'eeee', {
      locale: ptBR,
    });

    return {
      isToday: selectedDateIsToday,
      asText: selectedDateAsText,
      weekDay: selectedDateWeekDay,
    };
  }, [selectedDate]);

  const nextAppointment = useMemo(() => {
    if (!isToday(selectedDate)) return false;

    return appointments.find((appointment) => isAfter(parseISO(appointment.date), new Date()));
  }, [selectedDate, appointments]);

  const morningAppointments = useMemo(() => {
    return appointments.filter((appointment) => parseISO(appointment.date).getHours() < 12);
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter((appointment) => parseISO(appointment.date).getHours() >= 12);
  }, [appointments]);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    getProviderMonthAvailability({
      id: user.id,
      date: currentMonth,
    })
      .then((response) => {
        setMonthAvailability(response);
      })
      .catch(() => {});
  }, [currentMonth, user?.id]);

  useEffect(() => {
    if (!user?.id) return;

    getProviderAppointments(selectedDate)
      .then((providerAppointments) => {
        const formattedAppointments = providerAppointments.map((appointment) => ({
          ...appointment,
          hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
        }));

        setAppointments(formattedAppointments);
      })
      .catch(() => {});
  }, [selectedDate, user?.id]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user?.avatarUrl || undefined} alt={user?.name} />

            <div>
              <span>Bem-vindo,</span>
              <Link to="/profile">
                <strong>{user?.name}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <Fi.Power />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>

          <p>
            {selectedDateInfo.isToday && (
              <>
                <span>Hoje</span>
                <Separator />
              </>
            )}
            <span>{selectedDateInfo.asText}</span>
            <Separator />
            <span>{selectedDateInfo.weekDay}</span>
          </p>

          {nextAppointment && (
            <NextAppointment>
              <p>Atendimento a seguir</p>

              <div>
                <img src={nextAppointment.user.avatarUrl} alt={nextAppointment.user.name} />

                <strong>{nextAppointment.user.name}</strong>

                <span>
                  <Fi.Clock />
                  {nextAppointment.hourFormatted}
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>Manhã</strong>

            {morningAppointments.length === 0 && <p>Nenhum agendamento na manhã</p>}

            {morningAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <Fi.Clock />
                  {appointment.hourFormatted}
                </span>

                <div>
                  <img src={appointment.user.avatarUrl} alt={appointment.user.name} />

                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>

          <Section>
            <strong>Tarde</strong>

            {morningAppointments.length === 0 && <p>Nenhum agendamento à tarde</p>}

            {afternoonAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <Fi.Clock />
                  {appointment.hourFormatted}
                </span>

                <div>
                  <img src={appointment.user.avatarUrl} alt={appointment.user.name} />

                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...unavailableDays]}
            selectedDays={selectedDate}
            modifiers={{
              available: {
                daysOfWeek: [1, 2, 3, 4, 5],
              },
            }}
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
