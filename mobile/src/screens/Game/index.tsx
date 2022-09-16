import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import logoImg from "../../assets/logo-nlw-esports.png";
import { Background } from "../../components/Background";
import { useRoute, useNavigation } from "@react-navigation/native";
import { GameParams } from "../../@types/navigation";
import { FlatList, Image, TouchableOpacity, View, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { THEME } from "../../theme";
import { Heading } from "../../components/Heading";
import { DuoCard, DuoCardProps } from "../../DuoCard";
import { useEffect, useState } from "react";

export function Game() {
  const route = useRoute();
  const game = route.params as GameParams;
  const navigation = useNavigation(); 
  const [duos, setDuos] = useState<DuoCardProps[]>([])

  function handleGoBack() {
    navigation.goBack();
  }

  
useEffect(() => {
  fetch(`http://192.168.20.128:3333/games/${game.id}/ads`)
    .then(response => response.json())
    .then(data => setDuos(data))
}, []);


  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image 
            source={logoImg} 
            style={styles.logo} 
          />

            <View style={styles.right}/>
        </View>

        <Image
          source={{uri: game.bannerUrl}}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading 
          title={game.title} 
          subtitle="Conecte-se e comece a jogar!" 
        />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <DuoCard 
              data={item}
              onConnect={() => {}}
            />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anuncios publicados ainda.
            </Text>
          )}
        />
      </SafeAreaView>
    </Background>
  );
}
