import Head from "next/head";

function HeadSeo(head_props) {
    var headSeoData = {};
    
    // Parse the current host to ensure absolute URLs
    var hostname = "bankifsccode.qpkendra.com";
    if (typeof window !== 'undefined') {
        hostname = window.location.hostname;
    }

    if (head_props?.headtype === "search_params") {
        headSeoData.title = `IFSC Code for ${head_props?.head_data?.bnh?.replaceAll("_", " ")} Branch of ${head_props?.bank_name?.replaceAll("_", " ")} | QPkendra`;
        headSeoData.description = `IFSC Code for ${head_props?.bank_name?.replaceAll("_", " ")} of ${head_props?.head_data?.c2?.replaceAll("_", " ")},${head_props?.head_data?.s?.replaceAll("_", " ")} for ${head_props?.head_data?.bnh?.replaceAll("_", " ")} Branch is ${head_props?.len?.[0]?.IFSC}.`;
        headSeoData.url = head_props?.head_url;
    }
    else if (head_props?.headtype === "ifsc_search_params") {
        headSeoData.title = `IFSC Code ${head_props?.len?.[0]?.IFSC} :${head_props?.head_data?.bnh?.replaceAll("_", " ")} Branch of ${head_props?.bank_name?.replaceAll("_", " ")} | QPkendra`;
        headSeoData.description = `IFSC Code for ${head_props?.bank_name?.replaceAll("_", " ")} of ${head_props?.head_data?.c2?.replaceAll("_", " ")},${head_props?.head_data?.s?.replaceAll("_", " ")} for ${head_props?.head_data?.bnh?.replaceAll("_", " ")} Branch is ${head_props?.len?.[0]?.IFSC}.`;
        headSeoData.url = "https://" + hostname + head_props?.head_url;
    }
    else if (head_props?.headtype === "Bank_Name_Page") {
        headSeoData.title = `${head_props?.bank_name} IFSC, MICR Code in India |IFSC Code`;
        headSeoData.description = `Get ${head_props?.bank_name} IFSC code, MICR code and all ${head_props?.bank_name} branch's address by BranchWise list`;
        headSeoData.url = head_props?.head_url;
    }
    else if (head_props?.headtype === "Bank_State_Page") {
        headSeoData.title = `${head_props?.bank_name}, ${head_props?.bank_state} IFSC, MICR Code in India |IFSC Code`;
        headSeoData.description = `Get ${head_props?.bank_name}, ${head_props?.bank_state} IFSC code, MICR code and all ${head_props?.bank_name} branch's address by BranchWise list`;
        headSeoData.url = head_props?.head_url;
    }
    else if (head_props?.headtype === "Bank_City_Page") {
        headSeoData.title = `${head_props?.router_data?.pg_bnk_name?.replaceAll("_", " ")}, ${head_props?.router_data?.pg_bnk_state?.replaceAll("_", " ")}, ${head_props?.router_data?.pg_bnk_city2?.replaceAll("_", " ")} IFSC, MICR Code in India |IFSC Code`;
        headSeoData.description = `Get ${head_props?.router_data?.pg_bnk_name?.replaceAll("_", " ")}, ${head_props?.router_data?.pg_bnk_state?.replaceAll("_", " ")}, ${head_props?.router_data?.pg_bnk_city2?.replaceAll("_", " ")} IFSC code, MICR code`;
        headSeoData.url = head_props?.head_url;
    }
    else if (head_props?.headtype === "List_Bank_Name") {
        headSeoData.title = "List of Banks in India";
        headSeoData.description = "List of Banks in India to find state and IFSC Codes";
        headSeoData.url = head_props?.head_url;
    }
    else {
        headSeoData.title = "Search Bank IFSC Code | QPkendra";
        headSeoData.description = "Search IFSC Code for .....";
        headSeoData.url = head_props?.head_url || `https://${hostname}`;
    }

    // Prepare Breadcrumb JSON-LD
    let breadcrumbJson = "";
    if (head_props?.breadcrumbs && head_props.breadcrumbs.length > 0) {
        const itemListElement = head_props.breadcrumbs.map((crumb, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": crumb.name.replaceAll("_", " "),
            "item": crumb.url
        }));
        breadcrumbJson = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": itemListElement
        });
    }

    // Prepare BankOrCreditUnion JSON-LD
    let localBusinessJson = "";
    if (head_props?.headtype === "search_params" && head_props?.len?.[0]) {
        const branch = head_props.len[0];
        localBusinessJson = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BankOrCreditUnion",
            "name": `${branch.BANK} - ${branch.BRANCH}`,
            "image": `https://${hostname}/assets/favicon.png`,
            "url": head_props.head_url,
            "telephone": branch.CONTACT || "",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": branch.ADDRESS,
                "addressLocality": branch.CITY2,
                "addressRegion": branch.STATE,
                "addressCountry": "IN"
            },
            "branchCode": branch.BRANCH,
            "identifier": branch.IFSC
        });
    }

    return (
        <Head>
            <title>{headSeoData.title}</title>
            <meta name="description" content={headSeoData.description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="robots" content="index,follow" />
            <meta name="googlebot" content="index,follow" />
            
            {/* Twitter metadata */}
            <meta property="twitter:card" content="summary" />
            <meta property="twitter:creator" content="Bank IFSC | QPkendra" />
            <meta property="twitter:title" content={headSeoData.title} />
            <meta property="twitter:description" content={headSeoData.description} />
            
            {/* Open Graph metadata */}
            <meta property="og:locale" content="en_US" />
            <meta property="og:site_name" content="Bank IFSC | QPkendra" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={headSeoData.title} />
            <meta property="og:description" content={headSeoData.description} />

            {/* Canonical link */}
            {headSeoData?.url && <meta data-rh="true" property="og:url" content={headSeoData.url} />}
            {headSeoData?.url && <meta property="twitter:url" content={headSeoData.url} />}
            {headSeoData?.url && <link rel="canonical" href={headSeoData.url} />}

            {/* Dynamic Breadcrumbs Schema */}
            {breadcrumbJson && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJson }} />
            )}

            {/* BankOrCreditUnion LocalBusiness Schema */}
            {localBusinessJson && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: localBusinessJson }} />
            )}

            {/* Speakable AI Schema */}
            {head_props?.headtype === "search_params" && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org/",
                    "@type": "WebPage",
                    "name": `IFSC Code for ${head_props?.head_data?.bnh?.replaceAll("_", " ")} Branch of ${head_props?.bank_name?.replaceAll("_", " ")}`,
                    "speakable": {
                        "@type": "SpeakableSpecification",
                        "cssSelector": [
                            ".at_span_bank_name",
                            ".at_span_bank_branch",
                            ".at_span_bank_ifsccode"
                        ]
                    },
                    "url": head_props?.head_url
                })}} />
            )}

            {/* FAQ QnA Schema */}
            {head_props?.headtype === "search_params" && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": [
                        {
                            "@type": "Question",
                            "name": `What is the IFSC code of ${head_props?.head_data?.bnh?.replaceAll("_", " ")}, ${head_props?.bank_name?.replaceAll("_", " ")}?`,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": `The IFSC code of ${head_props?.head_data?.bnh?.replaceAll("_", " ")}, ${head_props?.bank_name?.replaceAll("_", " ")} is ${head_props?.len?.[0]?.IFSC}`
                            }
                        },
                        {
                            "@type": "Question",
                            "name": `What is the address associated with ${head_props?.len?.[0]?.IFSC}`,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": `The address associated with ${head_props?.len?.[0]?.IFSC} is ${head_props?.len?.[0]?.ADDRESS}`
                            }
                        }
                    ]
                })}} />
            )}
        </Head>
    );
}

export default HeadSeo;