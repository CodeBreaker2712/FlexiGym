"use client";
import Head from "next/head";
import Link from "next/link";
import { Container, Typography, Button, Grid } from "@mui/material";
import AboutComponent from "../components/aboutComponent";
import AmenitiesComponent from "../components/amenitiesComponent";
import MembershipComponent from "../components/membershipComponenet";
import NavigationPanel from "../components/navigationPanel";
import Image from 'next/image';
import gymImage from '../../public/heroImage.jpeg';
// import { Search } from '@mui/icons-material';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>FlexiGym</title>
      </Head>
      <NavigationPanel />

      <Container maxWidth="lg" className="py-12 text-center">
        <div className="min-h-screen flex justify-center items-center">

          <div>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to FlexiGym
          </Typography>
          <Typography variant="subtitle1" component="p" gutterBottom>
            Find the perfect gym for your fitness journey!
          </Typography>
          <Grid container justifyContent="center" className="mt-8">
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Link href="/faq" passHref>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  fullWidth
                >
                  Learn More
                </Button>
              </Link>
            </Grid>
          </Grid>
          </div>
          {/* <Image
              src={gymImage}
              alt="Gym Image"
              objectFit="cover"
              className="rounded-lg"
            /> */}
        </div>
        <AboutComponent />

        <MembershipComponent />
        <AmenitiesComponent />
      </Container>
    </div>
  );
}
