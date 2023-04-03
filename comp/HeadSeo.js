import Head from "next/head";
function HeadSeo(head_props) {
    var headSeoData = {};
    if (head_props?.headtype === "search_params") {
        headSeoData.title = `IFSC Code for ${head_props?.head_data?.bnh?.replaceAll("_", " ")} Branch of ${head_props?.bank_name?.replaceAll("_", " ")} | QPkendra`
        headSeoData.description = `IFSC Code for ${head_props?.bank_name?.replaceAll("_", " ")} of ${head_props?.head_data?.c2?.replaceAll("_", " ")},${head_props?.head_data?.s?.replaceAll("_", " ")} for ${head_props?.head_data?.bnh?.replaceAll("_", " ")} Branch is ${head_props?.len[0]?.IFSC}.`
        headSeoData.url = head_props?.head_url;
    }
    else if (head_props?.headtype === "ifsc_search_params") {
        if (typeof window !== 'undefined') {
            var hostname = window.location.hostname;
         }
        headSeoData.title = `IFSC Code ${head_props?.len[0].IFSC} :${head_props?.head_data?.bnh?.replaceAll("_", " ")} Branch of ${head_props?.bank_name?.replaceAll("_", " ")} | QPkendra`
        headSeoData.description = `IFSC Code for ${head_props?.bank_name?.replaceAll("_", " ")} of ${head_props?.head_data?.c2?.replaceAll("_", " ")},${head_props?.head_data?.s?.replaceAll("_", " ")} for ${head_props?.head_data?.bnh?.replaceAll("_", " ")} Branch is ${head_props?.len[0]?.IFSC}.`
        headSeoData.url = "https://"+hostname+head_props?.head_url;
    }
    else if (head_props?.headtype === "Bank_Name_Page") {
        headSeoData.title = `${head_props?.bank_name} IFSC, MICR Code in India |IFSC Code`,
            headSeoData.description = `Get ${head_props?.bank_name}  IFSC code, MICR code and all ${head_props?.bank_name} branch's address by BranchWise list`
    }
    else if (head_props?.headtype === "Bank_State_Page") {
        headSeoData.title = `${head_props?.bank_name} ,${head_props?.bank_state} IFSC, MICR Code in India |IFSC Code`,
            headSeoData.description = `Get ${head_props?.bank_name},${head_props?.bank_state} IFSC code, MICR code and all ${head_props?.bank_name} branch's address by BranchWise list`
    }
    else if (head_props?.headtype === "Bank_City_Page") {
        headSeoData.title = `${head_props?.router_data.pg_bnk_name?.replaceAll("_", " ")},${head_props?.router_data.pg_bnk_state?.replaceAll("_", " ")},${head_props?.router_data.pg_bnk_city2?.replaceAll("_", " ")} IFSC, MICR Code in India |IFSC Code`,
            headSeoData.description = `Get ${head_props?.router_data.pg_bnk_name?.replaceAll("_", " ")},${head_props?.router_data.pg_bnk_state?.replaceAll("_", " ")},${head_props?.router_data.pg_bnk_city2?.replaceAll("_", " ")} IFSC code, MICR code   `
    }
    else if (head_props?.headtype === "Bank_Branch_Page") {
        headSeoData.title = `IFSC Code for ${head_props?.router_data.pg_bnk_name?.replaceAll("_", " ")} Branch of ${head_props?.router_data.pg_bnk_branch?.replaceAll("_", " ")} | QPkendra`
        headSeoData.description = `IFSC Code for ${head_props?.router_data.pg_bnk_name?.replaceAll("_", " ")} of ${head_props?.router_data.pg_bnk_city2?.replaceAll("_", " ")},${head_props?.router_data.pg_bnk_state?.replaceAll("_", " ")} for ${head_props?.router_data.pg_bnk_branch?.replaceAll("_", " ")} Branch is.${head_props?.ifsc_code}`
    }
    else if (head_props?.headtype === "List_Bank_Name") {
        headSeoData.title = "List of Banks in India "
        headSeoData.description = "List of Banks in India to find state and IFSC Codes"
    }
    else {
        headSeoData.title = "Search Bank IFSC Code | QPkendra"
        headSeoData.description = "Search IFSC Code for ....."
    }
    return (
        <Head>
            <title>{headSeoData.title}</title>
            <meta name="description" content={headSeoData.description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="robots" content="index,follow"/>
            <meta name="googlebot" content="index,follow"/>
            {/* //twitter metadata */}
            <meta property="twitter:card" content="summary" />
            <meta property="twitter:creator" content="Bank IFSC | QPkendra" />
            {/* <meta property="twitter:site" content={siteMetadata.twitterHandle} /> */}
            <meta property="twitter:title" content={headSeoData.title} />
            <meta property="twitter:description" content={headSeoData.description} />
            {/* //open graph metadata */}1
            <meta property="og:locale" content="en_US" />
            <meta property="og:site_name" content="Bank IFSC | QPkendra" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={headSeoData.title} />
            <meta property="og:description" content={headSeoData.description} />
            {/* <meta data-rh="true" property="og:image" content={ogImageUrl} /> */}
            {/* <meta property="twitter:image" content={ogTwitterImage} /> */}

            {/* condition script fopr google speak ai */}
            {head_props?.headtype === "search_params" ? <script type="application/ld+json">{
                `{
                    "@context": "https://schema.org/",
                    "@type": "WebPage",
                    "name": "IFSC Code for ${head_props?.head_data?.bnh?.replaceAll("_", " ")} Branch of ${head_props?.bank_name?.replaceAll("_", " ")}",
                    "speakable": {
                        "@type": "SpeakableSpecification",
                        "cssSelector": [
                            ".at_span_bank_name",
                            ".at_span_bank_branch",
                            ".at_span_bank_ifsccode"
                        ]
                    },
                    "url": "${head_props?.head_url}"
                }`
            }
            </script> : ""}
            {/* for breadcumbs snippet */}
            {head_props?.headtype === "search_params" ? <script type="application/ld+json">{
                `
                {
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [{
                      "@type": "ListItem",
                      "position": 1,
                      "name": "${head_props?.bank_name?.replaceAll("_", " ")}",
                      "item": "https://bankifsccode.qpkendra.com/${head_props?.bank_name?.replaceAll(" ", "_")}"
                    },{
                      "@type": "ListItem",
                      "position": 2,
                      "name": "${head_props?.head_data?.bnh?.replaceAll("_", " ")}",
                      "item": "${head_props?.head_url}"
                    }]
                  }
                `
            }
            </script> : ""}
            {/* FAQ QnA Snippet */}
            {head_props?.headtype === "search_params" ? <script type="application/ld+json">{
                `
                {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": [
                        {
                            "@type": "Question",
                            "name": "What is the IFSC code of ${head_props?.head_data?.bnh?.replaceAll("_", " ")}, ${head_props?.bank_name?.replaceAll("_", " ")}?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "The IFSC code of ${head_props?.head_data?.bnh?.replaceAll("_", " ")}, ${head_props?.bank_name?.replaceAll("_", " ")} is ${head_props?.len[0]?.IFSC}"
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "What is the address associated with ${head_props?.len[0]?.IFSC}",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "The address associated with ${head_props?.len[0]?.IFSC} is ${head_props?.len[0]?.ADDRESS}"
                            }
                        }
                    ]
                }
                `
            }
            
            </script> : ""}
            {/* //canonical link */}
            {headSeoData?.url?<meta data-rh="true" property="og:url" content={headSeoData?.url} />:""}
            {headSeoData?.url?<meta property="twitter:url" content={headSeoData?.url} />:""}
            {headSeoData?.url?<link rel="canonical" href={headSeoData?.url} />:""}
        </Head>
    );
}


export default HeadSeo;