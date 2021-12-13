import React, { Component } from 'react';
import axios from 'axios';
import './scss/estilo.scss';


const URL = 'https://ico-fullstack-test.herokuapp.com/v1/histograma'

export default class SLA extends Component {
    constructor(props) {
        super(props);
        this.state = { listaItens: [] }
       
        this.refresh()

   }

    refresh(TAREFA = '') {
        const search = TAREFA ? `&TAREFA__regex=/${TAREFA}/` : ''
        axios.get(`${URL}?sort=-createdAt${search}`)
        .then(response => { this.setState({ listaItens: response.data}); })
        .catch(() => { console.log('Erro ao recuperar os dados'); });    
    }

    render() {
    return (
            <div>
                <table>
                    <thead>
                        <tr className='cabecalho'>
                            <th scope="col" className='cabecalhoTarefa'>Tarefa</th>
                            <th scope="col">Vencido</th>
                            <th scope="col">D0</th>
                            <th scope="col">D1</th>
                            <th scope="col">D2</th>
                            <th scope="col">D3</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.listaItens.map(function(item) { 
                            
                            let vContent = '';
                            let d0Content = '';
                            let d1Content = '';
                            let d2Content = '';
                            let d3Content = '';
                                            
                            item.DRILLDOWN.forEach((detalhe, index) => {
                                if (item.VENCIDO > 0 && index + 1 <= item.VENCIDO) { vContent = `${vContent}  \r\n PROTOCOLO: ${detalhe.PROTOCOLO} - ${detalhe.SLA}` }
                                if (item.D0 > 0 && index + 1 <= item.D0) { d0Content = `${d0Content}  \r\n PROTOCOLO: ${detalhe.PROTOCOLO} - SLA: ${detalhe.SLA}` }
                                if (item.D1 > 0 && index + 1 <= item.D1) { d1Content = `${d1Content}  \r\n PROTOCOLO: ${detalhe.PROTOCOLO} - SLA: ${detalhe.SLA}` }
                                if (item.D2 > 0 && index + 1 <= item.D2) { d2Content = `${d2Content}  \r\n PROTOCOLO: ${detalhe.PROTOCOLO} - SLA: ${detalhe.SLA}` }
                                if (item.D3 > 0 && index + 1 <= item.D3) { d3Content = `${d3Content}  \r\n PROTOCOLO: ${detalhe.PROTOCOLO} - SLA: ${detalhe.SLA}` }   
                            })
                        
                            return (
                                <>
                                <tr className={`${item.STT==='total'?`conteudoT`:`conteudo`}`}>
                                    <td className={`${item.STT==='total'?`conteudoTT`:`tarefa`}`}>{item.TAREFA}</td>
                                    <td onClick={() => alert(vContent)}
                                        className={`${item.STT==='total'?`conteudoT`:`vencido`}`}>
                                        {item.VENCIDO}
                                    </td>
                                    <td onClick={() => alert(d0Content)}
                                        className={`${item.STT==='total'?`conteudoT`:`d0`}`}>
                                            {item.D0}
                                    </td>
                                    <td onClick={() => alert(d1Content)}
                                        className={`${item.STT==='total'?`conteudoT`:`d1`}`}>
                                            {item.D1}
                                    </td>
                                    <td onClick={() => alert(d2Content)}
                                        className={`${item.STT==='total'?`conteudoT`:`d2`}`}>
                                            {item.D2}
                                    </td>
                                    <td onClick={() => alert(d3Content)}
                                        className={`${item.STT==='total'?`conteudoT`:`d3`}`}>
                                            {item.D3}
                                    </td>
                                    <td className={`${item.STT==='total'?`conteudoT`:`total`}`}>{item.TOTAL}</td>
                                </tr>                        

                                </>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}
  
        
      