import React from 'react';
import {Row, Col, Typography, Divider} from 'antd';
import 'antd/dist/antd.css';
import PaperForm from "./PaperForm";
import {Decryptor} from "./lib/decryptor";
import {GithubOutlined} from "@ant-design/icons";

const cheerio = require('cheerio');
const {Title, Paragraph} = Typography;


const layout = {
    xs: {span: 24},
    sm: {span: 22, offset: 1},
    md: {span: 20, offset: 2},
    lg: {span: 18, offset: 3}
}

function App() {
    const [decryptedPaper, setDecryptedPaper] = React.useState<string>("");
    const onSubmit = (content: string, key: string) => {
        const $ = cheerio.load(content);
        const data = $('#frm input[type="hidden"]').val();
        if (typeof data === 'undefined') {
            console.error('죄송합니다. 복호화에 실패했습니다.');
            return;
        }
        const result = Decryptor.decrypt(data, key);
        if (result.slice(0, 5) !== "<html") {
            console.error('복호화 실패');
            return;
        }
        setDecryptedPaper(result);
        console.log(result);
    }

    return (
        <>
            <Row>
                <Col {...layout} >
                
                <p />
                    <Typography>
                        <Title><img src="bucketplace-payslip-title.png" style={{width: '100%'}} /></Title>
                    </Typography>
                    <Divider/>
                    <PaperForm onSubmit={onSubmit}/>
                    <Divider/>
                </Col>
            </Row>
            <Row>
                {decryptedPaper && <Col {...layout}>
                    <iframe title={'view'} srcDoc={decryptedPaper} style={{display: 'block', width: '100%', height: '100vh'}}/>
                </Col>}
            </Row>
            <Row>
                <Col {...layout} >
                    <Typography>
                        <Paragraph>
                            본 서비스는 <a href="https://github.com/progoosle/douzone-payslip-viewer">https://github.com/progoosle/douzone-payslip-viewer</a>를 가져와서 버킷플레이스에 맞게 변형되어 제공되므로 안심하고 사용하셔도 됩니다.
                        </Paragraph>
                        관련 문의: <a href="mailto:yh.kim@bucketplace.net">@구슬</a>
                    </Typography>
                </Col>
            </Row>
        </>
    );
}

export default App;
