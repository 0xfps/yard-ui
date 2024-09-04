"use client"

import { Divider, Image } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { FaGithub } from "react-icons/fa";
import { FaBehance, FaXTwitter } from "react-icons/fa6";

export default function AboutHero() {
    return (
        <div className="mt-[200px] text-text text-center">
            <div className="text-center text-[80px] font-sf-bold">
                Meet The Builders
            </div>
            <div className="text-[26px] mt-[40px] font-sf-light">
                The amazing brains behind Yard 🦋.
            </div>
            <div className="w-[80%] m-auto flex justify-around mt-[200px]">
                {/* fps */}
                <Card className="min-w-[400px] shadow-sm shadow-div-grad-start rounded-[12px] bg-background p-5">
                    <CardHeader className="flex gap-3">
                        <a href="https://github.com/0xfps" target="_blank" className="hover:opacity-90">
                            <Image
                                alt="nextui logo"
                                height={40}
                                radius="full"
                                src="https://avatars.githubusercontent.com/u/74331706?v=4"
                                width={40}
                            />
                        </a>
                        <div className="text-start">
                            <p className="font-sf-bold">
                                <a href="https://twitter.com/0xfps" target="_blank" className="hover:opacity-90">
                                    fps
                                </a>
                            </p>
                            <p className="text-[12px] font-sf-light text-default-500">
                                <a href="https://twitter.com/0xfps" target="_blank" className="hover:opacity-80">
                                    @0xfps
                                </a>
                            </p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <p>Smart contract developer, frontend engineer.</p>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <div className="w-[20%] mt-4 flex flex-row justify-around items-center text-text text-[20px]">
                            <a href="https://github.com/0xfps" target="_blank" className="hover:opacity-80"><FaGithub /></a>
                            <a href="https://twitter.com/0xfps" target="_blank" className="hover:opacity-80"><FaXTwitter /></a>
                        </div>
                    </CardFooter>
                </Card>

                {/* Sagetony */}
                <Card className="min-w-[400px] shadow-sm shadow-div-grad-start rounded-[12px] bg-background p-5">
                    <CardHeader className="flex gap-3">
                        <a href="https://github.com/sagetony" target="_blank" className="hover:opacity-90">
                            <Image
                                alt="nextui logo"
                                height={40}
                                radius="full"
                                src="https://avatars.githubusercontent.com/u/63256806?v=4"
                                width={40}
                            />
                        </a>
                        <div className="text-start">
                            <p className="font-sf-bold">
                                <a href="https://twitter.com/sagetony224" target="_blank" className="hover:opacity-90">
                                    0xsagetony
                                </a>
                            </p>
                            <p className="text-[12px] font-sf-light text-default-500">
                                <a href="https://twitter.com/sagetony224" target="_blank" className="hover:opacity-80">
                                    @sagetony224
                                </a>
                            </p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <p>Smart contract developer and auditor, frontend engineer.</p>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <div className="w-[20%] mt-4 flex flex-row justify-around items-center text-text text-[20px]">
                            <a href="https://github.com/sagetony" target="_blank" className="hover:opacity-80"><FaGithub /></a>
                            <a href="https://twitter.com/sagetony224" target="_blank" className="hover:opacity-80"><FaXTwitter /></a>
                        </div>
                    </CardFooter>
                </Card>

                {/* Oma */}
                <Card className="min-w-[400px] shadow-sm shadow-div-grad-start rounded-[12px] bg-background p-5">
                    <CardHeader className="flex gap-3">
                        <a href="https://x.com/BilionaireRaven" target="_blank">
                            <Image
                                alt="nextui logo"
                                height={40}
                                radius="full"
                                src="/images/oma.jpg"
                                width={40}
                            />
                        </a>

                        <div className="text-start">
                            <p className="font-sf-bold">
                                <a href="https://x.com/BilionaireRaven" target="_blank" className="hover:opacity-90">
                                    Raven 𖤍💎
                                </a>
                            </p>
                            <p className="text-[12px] font-sf-light text-default-500">
                                <a href="https://x.com/BilionaireRaven" target="_blank" className="hover:opacity-80">
                                    @BilionaireRaven
                                </a>
                            </p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <p>UI/UX Engineer</p>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <div className="w-[20%] mt-4 flex flex-row justify-around items-center text-text text-[20px]">
                            <a href="https://www.behance.net/helenobika" target="_blank" className="hover:opacity-80"><FaBehance /></a>
                            <a href="https://x.com/BilionaireRaven" target="_blank" className="hover:opacity-80"><FaXTwitter /></a>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}