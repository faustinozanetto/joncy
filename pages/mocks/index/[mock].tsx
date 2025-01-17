import {ParsedUrlQuery} from "querystring";

import * as React from "react";
import {GetStaticPaths, GetStaticProps} from "next";

import {Job} from "../../../job/types";
import api from "../../../job/api";
import JobsScreen from "../../../job/screens/Jobs";

interface Props {
  jobs: Job[];
}

interface Params extends ParsedUrlQuery {
  mock: string;
}

const IndexRoute: React.FC<Props> = ({jobs}) => {
  return <JobsScreen jobs={jobs} />;
};

export const getStaticProps: GetStaticProps<unknown, Params> = async ({params}) => {
  // Don't render this page in production
  if (process.env.NEXT_PUBLIC_ENV === "production") {
    return {
      notFound: true,
    };
  }

  // Get jobs for selected mock
  const jobs = await api.mock.list(params.mock);

  return {
    props: {
      jobs,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    // Only get paths for non production environments
    fallback: process.env.NEXT_PUBLIC_ENV === "production" ? false : "blocking",
  };
};

export default IndexRoute;
