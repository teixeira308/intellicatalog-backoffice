import React from "react";
import * as C from "./styles";
import Navbar from "../../components/Navbar/Navbar";
import { FaEdit, FaImages, FaCog, FaRegWindowRestore } from 'react-icons/fa'; // Importa o ícone de lápis

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
                                    <li>Entre no menu Minha Loja</li>
                                    <li>Clique no ícone <FaImages/> </li>
                                    <li>Escolha a foto em seu dispositivo.</li>
                                    <li>Adicione uma descrição opcional.</li>
                                    <li>Clique em salvar.</li>
                                </ol>
                            </C.AccordionBody>
                        </C.AccordionItem>
                        <C.AccordionItem>
                            <C.AccordionHeader>Alterar dados da loja</C.AccordionHeader>
                            <C.AccordionBody>
                                <ol>
                                    <li>Entre no menu Minha Loja</li>
                                    <li>Clique no ícone <FaEdit/> </li>
                                    <li>Altere as informações de identificação da Loja</li>
                                    <li>Clique em salvar.</li>
                                </ol>
                            </C.AccordionBody>
                        </C.AccordionItem>
                        <C.AccordionItem>
                            <C.AccordionHeader>Alterar configurações da loja</C.AccordionHeader>
                            <C.AccordionBody>
                                <ol>
                                <li>Entre no menu Minha Loja</li>
                                    <li>Clique no ícone <FaCog/> </li>
                                    <li>Altere as configurações da Loja</li>
                                    <li>Clique em salvar.</li>
                                </ol>
                            </C.AccordionBody>
                        </C.AccordionItem>
                        <C.AccordionItem>
                            <C.AccordionHeader>Mudar link da loja</C.AccordionHeader>
                            <C.AccordionBody>
                                <ol>
                                    <li>Entre no menu Minha Loja</li>
                                    <li>Clique no ícone <FaEdit/> </li>
                                    <li>Altere o Identificador Externo</li>
                                    <li>Clique em salvar.</li>
                                    <li>Clique no ícone <FaRegWindowRestore/> para gerar o link novo da loja</li>
                                </ol>
                            </C.AccordionBody>
                        </C.AccordionItem>
                        <C.AccordionItem>
                            <C.AccordionHeader>Abrir ou fechar a loja</C.AccordionHeader>
                            <C.AccordionBody>
                                <ol>
                                    <li>Entre no menu Minha Loja</li>
                                    <li>Se a bolinha ao lado da imagem da loja estiver verde, a loja está aberta.</li>
                                    <li>Clice no ícone "liga/desliga"</li>
                                    <li>Se a bolinha ao lado da imagem da loja estiver vermelha, a loja está fechada.</li>
                                </ol>
                            </C.AccordionBody>
                        </C.AccordionItem>
                    </C.Accordion>
                  {/*} 
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
                    {*/} 
                </C.CardBody>
            </C.Card>
        </C.Container>
    );
};

export default Tutorial;
