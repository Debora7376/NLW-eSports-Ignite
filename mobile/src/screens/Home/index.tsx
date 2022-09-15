import { useEffect, useState } from 'react';
import { Image, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import logoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { styles } from './styles';
import { GameCard, GameCardProps } from '../../components/GameCard';

export function Home() {
const [games, setGames] = useState<GameCardProps[]>([]);

  useEffect(() => {
  fetch('http://192.168.20.122:3333/games')
  .then(response => response.json())
  .then(data => setGames(data))
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Image 
        source={logoImg}
        style={styles.logo}
        />

        <Heading 
        title={"Encontre seu duo!"} 
        subtitle={"Selecione o game que você deseja jogar..."}
        />

        <FlatList 
          data={games}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <GameCard
              data={item}
          />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
        />
    </SafeAreaView>
  );
}