import {
  alchemy,
  getBlockNumber,
  getNativeBalance,
  getTokenBalance,
  getValidAddress,
  toEther,
} from '../api/alchemySDK/utils';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { TokenBal, TokenBalMap } from '../utils/interface';
import {
  Container,
  Title,
  Stack,
  Select,
  TextInput,
  Button,
  Skeleton,
  Text,
  Table,
  Avatar,
  Group,
  UnstyledButton,
} from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import { IconSearch, IconStar } from '@tabler/icons-react';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [blockNumber, setBlockNumber] = useState<number>(0);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nativeBalance, setNativeBalance] = useState<number>(-2);
  const [tokenBalance, setTokenBalance] = useState<TokenBalMap[]>();

  const handleSearch = () => {
    if (!isLoading && inputValue.length > 0) {
      setIsLoading(true);
      getToken(inputValue);
    }
  };

  useEffect(() => {
    const getBlock = async () => {
      setBlockNumber(await getBlockNumber());
    };
    getBlock();
  }, []);

  const getToken = async (address: string) => {
    try {
      const nativeToken = await getNativeBalance(address);
      setNativeBalance(nativeToken);

      const addressIsValid = getValidAddress(address);

      if (addressIsValid) {
        const tokenArr = await getTokenBalance(address);

        if (tokenArr) {
          const balanceObj: TokenBal = {};

          for (let token of tokenArr) {
            if (toEther(token.tokenBalance) > 0) {
              const tokenDetails = await alchemy.core.getTokenMetadata(
                token.contractAddress,
              );

              if (
                tokenDetails.symbol &&
                balanceObj[tokenDetails.symbol] !== tokenDetails.symbol
              ) {
                balanceObj[tokenDetails.symbol] = {
                  tokenValue: toEther(token.tokenBalance),
                  tokenDetails,
                };
              }
            }
          }

          const balanceArr: TokenBalMap[] = Object.entries(balanceObj)
            .map(([key, value]) => ({
              [key]: {
                tokenValue: value.tokenValue,
                tokenDetails: value.tokenDetails,
              },
            }))
            .sort((a, b) => {
              const tokenA = Object.values(a)[0];
              const tokenB = Object.values(b)[0];
              return tokenB.tokenValue - tokenA.tokenValue;
            }) as TokenBalMap[];

          console.warn(JSON.stringify(balanceArr));

          setTokenBalance(balanceArr);
        } else {
          setTokenBalance([]);
        }
      }
    } catch (e) {
      console.error('error :\n', e);
      setIsLoading(false);
      return null;
    }
    setIsLoading(false);
  };

  const rows = tokenBalance?.map((item) => {
    const key = Object.keys(item)[0];

    return (
      <tr key={key}>
        <td>
          <UnstyledButton>
            <Group>
              <Avatar
                size={50}
                src={item[key].tokenDetails.logo}
                alt={item[key].tokenDetails.symbol}
              >
                <IconStar size="1.5rem" />
              </Avatar>
              <Text>{item[key].tokenDetails.name}</Text>
            </Group>
          </UnstyledButton>
        </td>
        <td>
          {item[key].tokenValue} {item[key].tokenDetails.symbol}
        </td>
      </tr>
    );
  });

  return (
    <>
      <ColorSchemeToggle />
      <Container size="sm" px="xl">
        <Title align="center" m={50}>
          Welcome to{' '}
          <Text inherit variant="gradient" component="span">
            Block Explorer
          </Text>
        </Title>

        <Stack>
          <Select
            label="Network"
            style={{ width: 150 }}
            placeholder="Network"
            defaultValue="Ethereum"
            data={[{ value: 'Ethereum', label: 'Ethereum' }]}
          />
          <TextInput
            label="Search by Address"
            style={{ width: '100%' }}
            placeholder="Search by Address or .Eth name"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.currentTarget.value);
              if (e.currentTarget.value.length === 0 && nativeBalance === -1) {
                setNativeBalance(-2);
              }
            }}
            onKeyDown={getHotkeyHandler([['Enter', handleSearch]])}
            rightSection={
              <Button
                loaderPosition="center"
                disabled={isLoading || inputValue.length === 0}
                onClick={handleSearch}
              >
                <IconSearch size="1rem" />
              </Button>
            }
          />

          <Skeleton visible={isLoading}>
            {nativeBalance >= 0 ? (
              <Stack>
                <Group position="apart">
                  <Title order={2}>You have : {nativeBalance} Eth</Title>
                  <Title order={5}>Current block number : {blockNumber}</Title>
                </Group>
                <Table striped highlightOnHover withBorder>
                  <thead>
                    <tr>
                      <th>
                        <Title order={2}>Asset</Title>
                      </th>
                      <th>
                        {' '}
                        <Title order={2}>Balance</Title>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{rows}</tbody>
                </Table>
              </Stack>
            ) : (
              <Stack>
                {nativeBalance != -2 && (
                  <Text>Invalid wallet address provided</Text>
                )}
              </Stack>
            )}
          </Skeleton>
        </Stack>
      </Container>
    </>
  );
}
