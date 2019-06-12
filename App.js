import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { Avatar, SearchBar } from 'react-native-elements';


//OBS: O useState([]) não cria um array, o typeOf continua sendo um objeto e não entendi ainda porque...
//OBS2: O FlatList não aceita objetos vazios, por isso o uso do Object.keys() pra 'transformar' em array.

function App() {

	const [ repositories, setRepositories ] = useState([]); //Lembrar de testar com null
	const [ load, setLoad ] = useState(true);
	const [ searchUser, setSearchUser ] = useState('rafaelfern');
	const [ userId, setUserId ] = useState(6664987);
	const [ userInfo, setUserInfo ] = useState([]);

	async function fetchFromGithub() {
		const response = await fetch(`https://api.github.com/users/${searchUser}/repos`);
		const data = await response.json();
							
		setRepositories(data);
		setLoad(false);
	
	}

	async function fetchSearchUser() {
		const responseUser = await fetch(`https://api.github.com/users/${searchUser}`);
		const dataUser = await responseUser.json();
		setUserInfo(dataUser);
	}

	useEffect(
		() => {
			fetchSearchUser();
		},[searchUser]
	)

	useEffect(
		() => { 
			fetchFromGithub();
		},[searchUser]
	);
	
	return(
		
		<View style={styles.container}>
			<View style={styles.titleCont}>
				
				<Text style={styles.titleText}> My GitHub Repos -  </Text>
				<Avatar
					rounded
					source={{uri: `https://avatars1.githubusercontent.com/u/${userId}?v=4`}}
				/>
			</View>

			<View>
				<SearchBar 
					placeholder='Search User'
					onChangeText={ (text) => {
							setSearchUser(text);
							setUserId(userInfo.id)
						}
					}
					//onChangeText={()=>setSearchUser(searchUser)}
					value={searchUser}
				>

				</SearchBar>
			</View>
			
			<View>{ load ? <ActivityIndicator size="large" color="#d3d3d3"/> :  null }</View>
			<View style={styles.containerList}>
				
				<ScrollView>
								

					{
						<FlatList
							data={Object.keys(repositories)}
							renderItem={
								({ item }) => <Text>{repositories[item].name}</Text>
							}
							//keyExtractor={(item) => repositories[item].id.toString()}
						/>
					}

				</ScrollView>

			</View>
			<View style={styles.containerButton}>
			
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
  },
  containerList: {
		paddingLeft: 20,
		paddingTop: 20,
		marginBottom: 4,
  },
  titleCont: {
		borderBottomColor: '#d3d3d3',
		borderBottomWidth: 0.5,
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between'
  },
  titleText: {
		fontSize: 20,
  },
  
});

export default App;