
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity,Clipboard, TextInput,Keyboard,TouchableWithoutFeedback } from 'react-native';


//https://cutt.ly/api/api.php?key=1adf3b392d9420ab8d09f0ad3ca13db8861e1&stats=${url}name=${name}

export default function URL() {
    const [url, setUrl] = useState("")
    const [name, setName] = useState("")
    const [urlfinall, setUrlfinal] = useState("")

    const short = async() => {
        if(url.includes("https://") || url.includes("http://"))
        await fetch(`https://cutt.ly/api/api.php?key=3502c62ce37476dec73b4167bab80f34&short=${url}&name=${name}`)

        .then(async Response =>{
            const data = await Response.json()
            if(data.url.status===3){
                alert('Esse nome ja está em uso!')
                return
            }
            if(data.url.status===2){
                alert('url inavlida!')
                return
            }

            setUrlfinal(data.url.shortLink)
            Keyboard.dismiss()
        })
        
    }

    function copyurl(){
        Clipboard.setString(urlfinall)
        alert("copiado com sucesso!")
    }

    return (    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <Text style={styles.title}>URL
                <Text style={{ color: "#1073f7" }}>shortener</Text>
            </Text>
            <TextInput style={styles.urlInput}
                onChangeText={(texto) => setUrl(texto)}
                value={url}
                placeholder="Digite a URL .... "

            />


            <TextInput style={styles.urlInput}
                onChangeText={(texto) => setName(texto)}
                value={name}
                placeholder="Nome personalizado .... "
            />

            <TouchableOpacity onPress={()=>short()} style={styles.shortBtn}>
              <Text style={{color:"#fff"}}>Encurtar</Text>
            </TouchableOpacity>
            
           <TouchableWithoutFeedback onPress={urlfinall?copyurl: ()=>{ }}>
             <Text style={styles.finalurl}>{urlfinall}</Text>
           </TouchableWithoutFeedback>

        </View>
        </TouchableWithoutFeedback>
        
    );
    }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    title: {
        color: "#21243d",
        fontWeight: "bold",
        fontSize: 40,
        marginBottom: 20,
    },
    urlInput: {
        height: 50,
        width: "80%",
        borderColor: "#21243d",
        borderEndWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor: "#fafafa",
        marginBottom: 20,
        fontSize: 20
    },
    shortBtn:{
      backgroundColor:"#1076f7",
      borderRadius:10,
      height:40,
      width:"80%",
      justifyContent:"center",
      alignItems:"center",
      
    },
    finalurl:{
        height:40,
        width:"80%",
        marginTop:20,
        fontSize:20,
        textAlign:"center"
    }
})