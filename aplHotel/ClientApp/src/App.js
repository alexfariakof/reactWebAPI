import React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';

import ListHotel from './pages/Hotel';
import ListComodidade from './pages/Comodidade';
import FormComodidade from './pages/FormComodidade';
import FormHotel from './pages/FormHotel';


function App() {
    return (
        <Layout>
            <Route exact path='/' component={ListHotel} />
            <Route path='/listHotel' component={ListHotel} />
            <Route path='/listComodidade' component={ListComodidade} />
            <Route path='/formComodidade/:idComodidade' component={FormComodidade} />
            <Route path='/formHotel/:idHotel' component={FormHotel} />
        </Layout>
    );
}
export default App;