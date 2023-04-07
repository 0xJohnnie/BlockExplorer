import { Title, Text, Input, Container, Button } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import useStyles from './Welcome.styles';

export function Welcome() {
  const { classes } = useStyles();

  return (
    <Container>
      <Title className={classes.title} align="center" m={50}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span">
          Block Explorer
        </Text>
      </Title>

      <Input
        placeholder="Search by Address / Txn Hash"
        rightSection={
          <Button loaderPosition="center">
            <IconSearch size="1rem" />
          </Button>
        }
      />
    </Container>
  );
}
