import React from "react";
import * as C from "./styles";
import Navbar from "../../components/Navbar/Navbar";

const Tutorial = () => {
    return (
        <C.Container>
            <Navbar />
            <C.Card>
                <C.CardHeader>Tutorial</C.CardHeader>
                <C.CardBody>
                    <C.Accordion>
                        <C.AccordionItem>
                            <C.AccordionHeader>Alterar logo da Loja</C.AccordionHeader>
                            <C.AccordionBody>
                                <ol>
                                    <li>Entre no menu pessoas</li>
                                    <li>Clique em Nova Pessoa</li>
                                    <li>Adicione os dados da pessoa conforme os dados requisitados</li>
                                    <li>Caso queira ver todos os dados da pessoa, clique em o ícone de pesquisa.</li>
                                    <li>Caso queira editar algum dado inserido, clique no ícone de edição e altere os dados salvos.</li>
                                    <li>Para deletar uma pessoa registrada, clique no ícone de lixeira.</li>
                                </ol>
                            </C.AccordionBody>
                        </C.AccordionItem>
                        <C.AccordionItem>
                            <C.AccordionHeader>Alterar dados da loja</C.AccordionHeader>
                            <C.AccordionBody>
                                <ol>
                                    <li>Há campos disponíveis para os dados de pessoas:
                                        <ul>
                                            <li>Nome &#123;nome&#125;</li>
                                            <li>RG &#123;rg&#125;</li>
                                            <li>CPF &#123;cpf&#125;</li>
                                            <li>Data de Nascimento &#123;datanascimento&#125;</li>
                                            <li>Genero &#123;genero&#125;</li>
                                            <li>Estado Civil &#123;estadocivil&#125;</li>
                                            <li>Número da carteira de trabalho &#123;numerocarteiratrabalho&#125;</li>
                                            <li>Função no trabalho &#123;funcao&#125;</li>
                                            <li>Data de Admissão &#123;dataadmissao&#125;</li>
                                            <li>Endereço &#123;endereco&#125;</li>
                                            <li>Telefone &#123;telefone&#125;</li>
                                            <li>Celular &#123;celular&#125;</li>
                                            <li>E-mail &#123;email&#125;</li>
                                            <li>Nome Pai &#123;nomepai&#125;</li>
                                            <li>Nome Mãe &#123;nomemae&#125;</li>
                                        </ul>
                                    </li>
                                    <li>Insira nos documentos os dados que são necessários para completar automaticamente</li>
                                    <li>Salve o documento com um nome facilmente identificável</li>
                                    <li>Vá ao menu templates</li>
                                    <li>Escolha o arquivo no seu computador para upload</li>
                                    <li>Insira uma descrição para o arquivo gerado</li>
                                </ol>
                            </C.AccordionBody>
                        </C.AccordionItem>
                        <C.AccordionItem>
                            <C.AccordionHeader>Alterar configurações da loja</C.AccordionHeader>
                            <C.AccordionBody>
                                <ol>
                                    <li>Entre no menu pessoas</li>
                                    <li>Encontre a pessoa que deseja gerar o arquivo e clique no ícone de download</li>
                                    <li>Selecione o template que deseja gerar</li>
                                    <li>Confira o arquivo gerado</li>
                                </ol>
                            </C.AccordionBody>
                        </C.AccordionItem>
                        <C.AccordionItem>
                            <C.AccordionHeader>Mudar link da loja</C.AccordionHeader>
                            <C.AccordionBody>
                                <ol>
                                    <li>Entre no menu pessoas</li>
                                    <li>Encontre a pessoa que deseja gerar o arquivo e clique no ícone de download</li>
                                    <li>Selecione o template que deseja gerar</li>
                                    <li>Confira o arquivo gerado</li>
                                </ol>
                            </C.AccordionBody>
                        </C.AccordionItem>
                        <C.AccordionItem>
                            <C.AccordionHeader>Abrir ou fechar a loja</C.AccordionHeader>
                            <C.AccordionBody>
                                <ol>
                                    <li>Entre no menu pessoas</li>
                                    <li>Encontre a pessoa que deseja gerar o arquivo e clique no ícone de download</li>
                                    <li>Selecione o template que deseja gerar</li>
                                    <li>Confira o arquivo gerado</li>
                                </ol>
                            </C.AccordionBody>
                        </C.AccordionItem>
                    </C.Accordion>
                  
                    <C.VideoSection>
                        <p>Veja no vídeo como utilizar o Doc Filler para agilizar seus processos.</p>
                        <br/>
                        <C.VideoIframe
                            width="300"
                            height="500"
                            src="https://www.youtube.com/embed/tJI8UGll-d0?si=UFsEPXHaLqRInQsz"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    </C.VideoSection>
                </C.CardBody>
            </C.Card>
        </C.Container>
    );
};

export default Tutorial;
