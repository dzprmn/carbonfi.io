import {Routes, Route, useLocation} from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import {PageWrapper} from "./components/layout/PageWrapper.tsx";

import { WagmiProvider } from 'wagmi';
import {lightTheme, RainbowKitProvider} from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig, } from './config/wagmi';

// Import pages
import { Home } from '@/pages/Home';
import { NewsPage } from '@/pages/News';
import { NewsDetail } from '@/pages/NewsDetail';
// import { AboutPage } from '@/pages/About';
// import { FaqPage } from '@/pages/Faq';
// import { ContactPage } from '@/pages/Contact';

// Create a client
const queryClient = new QueryClient();

function App() {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={lightTheme()}>
                    <Layout>
                        <Header isTransparent={isHomePage} />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            {/*<Route path="/about" element={*/}
                            {/*    <PageWrapper>*/}
                            {/*        <AboutPage />*/}
                            {/*    </PageWrapper>*/}
                            {/*} />*/}
                            <Route path="/news" element={
                                <PageWrapper>
                                    <NewsPage />
                                </PageWrapper>
                            } />
                            <Route path="/news/:slug" element={
                                <PageWrapper>
                                    <NewsDetail />
                                </PageWrapper>
                            } />
                            {/*<Route path="/faq" element={*/}
                            {/*    <PageWrapper>*/}
                            {/*        <FaqPage />*/}
                            {/*    </PageWrapper>*/}
                            {/*} />*/}
                            {/*<Route path="/contact" element={*/}
                            {/*    <PageWrapper>*/}
                            {/*        <ContactPage />*/}
                            {/*    </PageWrapper>*/}
                            {/*} />*/}
                        </Routes>
                        <Footer />
                    </Layout>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

export default App;