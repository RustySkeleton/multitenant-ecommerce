
import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import dns from 'dns'; 

dns.setServers(['8.8.8.8', '8.8.4.4']);
const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default withPayload(withPayload(nextConfig));
