import { Route, useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import React, { useCallback, useMemo } from 'react';

import FeatherIcon from '../../components/FeatherIcon';
import {
  Container,
  Description,
  OkButton,
  OkButtonText,
  Title,
} from './AppointmentCreated.styles';

interface RouteParams {
  date: number;
}

export type AppointmentCreatedRoute = Route<'AppointmentCreated', RouteParams>;

const AppointmentCreated: React.FC = () => {
  const { reset } = useNavigation();
  const route = useRoute<AppointmentCreatedRoute>();
  const routeParams = route.params;

  const handleOkPressed = useCallback(() => {
    reset({
      routes: [
        {
          name: 'Dashboard',
        },
      ],
      index: 0,
    });
  }, [reset]);

  const formattedDate = useMemo(() => {
    return format(
      routeParams.date,
      "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
      {
        locale: ptBR,
      },
    );
  }, [routeParams.date]);

  return (
    <Container>
      <FeatherIcon name="check" size={80} color="#04D361" />

      <Title>Agendamento concluído</Title>
      <Description>{formattedDate}</Description>

      <OkButton onPress={handleOkPressed}>
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default AppointmentCreated;
