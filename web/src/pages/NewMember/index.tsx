import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom'; // navegar de um componente pra outro sem ter botão

import './styles.css';

import logo from '../../assets/logo.svg';

import { FiArrowLeft } from 'react-icons/fi';

import { Map, TileLayer, Marker } from 'react-leaflet';

import api from '../../services/api';

import axios from 'axios';

import { LeafletMouseEvent } from 'leaflet';

import Dropzone from '../../components/Dropzone';

// FIELDSET: Conjunto de campos, LEGEND: legenda do fieldset
// SELECT:  impedir que a cidade não condiza com o estado e uf OU city que não sejam validos

/* MAPA: seguindo exemplo do que foi importado e como os componentes foram utilizados em A simple Marker with Popup de https://react-leaflet.js.org/docs/en/examples 
    - center: recebe um array [latitude, longitude]
    - pegar coordenadas no google.maps (primeiro aparece latitude, depois long depois o zoom)
    - TyleLayer: Layout do mapa (open streen map, copiado do exemplo)
*/

/* Para evitar que toda alteração feita em CreatePoint execute tudo de novo, não colocamos api.get dentro do componente. Mas fora não faz sentido porque pertence ao componente
    useEffect(
        qual função quero executar,
        quando? (quando tal informação mudar, por exemplo se colocassemos {counter}). Se deixarmos [] será executado uma única vez
    )
*/


// Estado pra ARRAY ou OBJETO precisamos manualmente informar o tipo da variável armazenada
// INTERFACE: representação do formato que um objeto vai ter. Informamos no estado que é um array de items (useState<Item<[]>)
interface Item {
    id: number,
    title: string,
    image_url: string;
}
// Informamos que o axios.get vai retornar um array nesse formato (se fizessemos uf. espaço aparece a sigla pq informamos o formato)
interface IBGEUFResponse {
    sigla: string;
}

// Informamos que o axios.get vai retornar um array nesse formato
interface IBGECityResponse {
    nome: string;
}

const CreatePoint = () => {

    // Estado para armazenar as informações dos itens buscados no componente
    const [ items, setItems] = useState<Item[]>([]); // useState é um array de items e useState começa com array vazio e vai sendo carregado com o tempo, não temos itens inicialmente

    // Estado para armazenar as ufs
    const [ ufs, setUfs ] = useState<string[]>([]); // vetor de textos (ufs sao strings)

    // Estado para armazenar as cidades
    const [ cities, setCities ] = useState<string[]>([]); 

    // Uf que o usuário selecionou (armazenar em estado do componente)
    const [ selectedUf, setSelectedUf ] = useState('0'); // useState('0') pq a option do "Selecione uma uf" tem value="0"

    // Uf que o usuário selecionou (armazenar em estado do componente)
    const [ selectedCity, setSelectedCity] = useState('0'); // useState('0') pq a option do "Selecione uma uf" tem value="0"

    // Itens que o usuário clicou
    const [ selectedItems, setSelectedItems ] = useState<number[]>([]);

    // Posição inicial do pin na localização do usuário
    const [ initialPosition, setInitialPosition ] = useState<[number, number]>([0, 0]); //tipo da position (que marcamos no mapa é um array de numeros)

    // Posição que o usuário clicou no mapa
    const [ selectedPosition, setSelectedPosition ] = useState<[number, number]>([0, 0]); //tipo da position (que marcamos no mapa é um array de numeros)

    // Inputs do ponto de coleta
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        rua: '',
    });

    // Arquivo enviado no upload no dropzone (Armazena informação do tipo File (objeto global do javascript) )
    const [selectedFile, setSelectedFile] = useState<File>();

    const history = useHistory(); // redirecionar o usuário depois do ponto de coleta para a tela inicial

    //---------- COLOCAR O PIN INICIAL NA LOCALIZAÇÃO DO USUÁRIO ----------------
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => { // posição inicial do usuário assim que ele abrir a aplicação
            const { latitude, longitude } = position.coords;

            setInitialPosition([latitude, longitude])
        }); 
    }, [])

    // --------------- BUSCAR OS ITENS DA API --------------
    useEffect(() => {
        api.get('items').then(response => { // (.then = promisse) e assim que eu tiver uma resposta, executo
            setItems(response.data)
        });
    }, []);

    // ------------ BUSCAR AS UFS DA API DO IBGE ------------
    useEffect(() => {
        // se usassemos api.get usaria a baseURL (localhost) 
        // retirado de: https://servicodados.ibge.gov.br/api/docs/localidades?versao=1
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);
            
            setUfs(ufInitials);
        });
    }, []);

    // ------------ CARREGAR AS CIDADES SEMPRE QUE A UF FOR SELECIONADA  ------------
    // Precisamos armazenar o conteúdo dos inputs das ufs em estados do componente
    useEffect(() => { 
        // retirado de: https://servicodados.ibge.gov.br/api/docs/localidades?versao=1#api-Municipios-estadosUFMunicipiosGet
        if (selectedUf === '0') {
            return; // trata o inicio
        }
        axios
        .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
        .then(response => {
            const cityNames = response.data.map(city => city.nome);
            
            setCities(cityNames);
        });
        
    }, [selectedUf]); // executa sempre que selectedUf mudar


    function handleSelectedUf (event: ChangeEvent<HTMLSelectElement>) {
        // Chamada toda vez que o usuário mudar a uf, recebe um evento 
        // por causa do typescript, como não sabemos o tipo do evento, importamos o ChangeEvent (evento do tipo de formulário)
        // ChangeEvent<HTMLSelecElement>: recebe a tipagem de qual é o elemento alterado (evento de alteração de um HTML Select Element, variavel global do react )
        // Colocamos no select "value={selectedUf}" para que toda vez que essa variavel mudar refletir as alterações no select
        const uf = event.target.value;

        setSelectedUf(uf);
    }

    function handleSelectedCity (event: ChangeEvent<HTMLSelectElement>){
        const city = event.target.value;

        setSelectedCity(city);
    }

    function handleMapClick (event: LeafletMouseEvent) {
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng,
        ])
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target

        // Spread: Se apenas um dele é alterado, precisamos manter o dos outros quando o estado for alterado (copiamos o resto no objeto)
        // [name] ira substituir a informação específica (usa o nome da propriedade a ser alterada como variavel)
        setFormData( {...formData, [name]: value } );
    }

    function handleSelectedItem(id: number) {
        // usuario clica num item
        const alreadySelected = selectedItems.findIndex(item => item === id); // retorna 0 se existir um item no array com esse id e -1 se não estiver

        if (alreadySelected >= 0) { // REMOVE DO ARRAY (item fica branco de novo)
            const filteredItems = selectedItems.filter(item => item !== id);// filtra todos os itens pegando todos menos o que eu preciso remover

            setSelectedItems(filteredItems);
        } else { // ADICIONA NO ARRAY (item fica verde)
            // se colocarmos apenas setSelectedId(id) sempre que clicasse num novo, então com spred aproveitamos o que já tem e adicionamos um novo
            setSelectedItems([...selectedItems, id]);
        }
    }

    // Enviar para a API o novo ponto de coleta criado
    // colocamos no <form com onSubmit (função disparada assim que o usuario der um submit, pega tanto quando da enter quanto quando clica no botão)
    async function handleSubmit(event: FormEvent) { 
        // O funcionamento padrão do formulário no HTML envia o usuário em uma outra tela, para evitar isso:
        event.preventDefault();

        const { name, email, whatsapp, rua } = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [ latitude, longitude ] = selectedPosition;
        const items = selectedItems;
        
        const data = new FormData(); // FormData: classe global do JS que permite enviarmos multipart/form-data que aceita arquivos etc

        // dados enviados para a api ao inves de serem const data = { name, email... } agora alteramos pq tbm recebe imagem e JSON nao funciona com arquivos 
            data.append('name', name);
            data.append('email', email);
            data.append('whatsapp', whatsapp);
            data.append('rua', rua);
            data.append('uf', uf);
            data.append('city', city);
            data.append('latitude', String(latitude));
            data.append('longitude', String(longitude));
            data.append('items', items.join(',')); // tava reclamando pq era array numerico entao como recebemos 1,2,3 fizemos um join separados por ,
            
            if (selectedFile) { // se ele tiver enviado uma imagem
                data.append('image', selectedFile)
            }

        await api.post('points', data);

        alert('Ponto de coleta criado');

        // redirecionar para a home
        history.push('/');
    }

    return (
        <div id="cadastro-page">
            <header>
                { /*<img src={logo} alt="Ecoleta"/>*/}

                <Link to="/">
                    <FiArrowLeft />
                    Home
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
                {/* <h1>Dados de<br />local para descarte</h1> */}

                {/* ----- DADOS ----- */}
                
                <fieldset>
                    <div className="field">
                        <label htmlFor="name">Nome</label>
                        <input 
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="email">E-mail:</label>
                        <input 
                            type="text"
                            name="email"
                            id="email"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="password">Senha:</label>
                        <input 
                            type="text"
                            name="password"
                            id="password"
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    <div className="field">
                        <button type="submit">
                            Cadastrar
                        </button>
                    </div>
                </fieldset>
                
            </form>
        </div>
    );
}

export default CreatePoint;