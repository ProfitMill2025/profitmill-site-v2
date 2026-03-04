#!/usr/bin/env node
/**
 * Updates the Sanity terms & conditions document to match Figma design.
 * Uses the Sanity HTTP API directly (no npm install needed).
 */

const PROJECT_ID = "ce4idxlh";
const DATASET = "production";
const API_VERSION = "2025-09-25";
const TOKEN = process.env.SANITY_API_WRITE_TOKEN || "skg7ejvQrbQ4W6DNypGQMBaYOCy2wUiFnDD50rLagJTf8exTTtzrK3GirIg7I7ORJB9jmpFvH75FbFDCd2sbQDdljZS4Pm9XpdMQzsmm8taBUUSj0GCM2yGyBGBP5eOI1scZ0icJo66vsrk75TbNoPJIAVKivFDC4KwuefyrYSrOr7QI4F0Y";

let keyCounter = 0;
function genKey() {
  return `k${(++keyCounter).toString().padStart(4, "0")}`;
}

function heading(level, text) {
  return {
    _type: "block",
    _key: genKey(),
    style: `h${level}`,
    markDefs: [],
    children: [{ _type: "span", _key: genKey(), text, marks: [] }],
  };
}

function paragraph(text) {
  return {
    _type: "block",
    _key: genKey(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: genKey(), text, marks: [] }],
  };
}

function bulletItem(text, level = 1) {
  return {
    _type: "block",
    _key: genKey(),
    style: "normal",
    listItem: "bullet",
    level,
    markDefs: [],
    children: [{ _type: "span", _key: genKey(), text, marks: [] }],
  };
}

function bulletItemBold(boldText, normalText, level = 1) {
  return {
    _type: "block",
    _key: genKey(),
    style: "normal",
    listItem: "bullet",
    level,
    markDefs: [],
    children: [
      { _type: "span", _key: genKey(), text: boldText, marks: ["strong"] },
      { _type: "span", _key: genKey(), text: normalText, marks: [] },
    ],
  };
}

function linkParagraph(beforeText, linkText, href, afterText) {
  const linkKey = genKey();
  return {
    _type: "block",
    _key: genKey(),
    style: "normal",
    markDefs: [{ _type: "link", _key: linkKey, href }],
    children: [
      { _type: "span", _key: genKey(), text: beforeText, marks: [] },
      { _type: "span", _key: genKey(), text: linkText, marks: [linkKey] },
      { _type: "span", _key: genKey(), text: afterText, marks: [] },
    ],
  };
}

// Build the full terms & conditions content
const content = [
  // Intro paragraphs
  paragraph(
    'Please read these Terms and Conditions (\u201CTerms\u201D) carefully before using the website located at www.profitmill.io (the \u201CSite\u201D) or engaging the services of Profit Mill (\u201Cwe,\u201D \u201Cus,\u201D or \u201Cour\u201D). These Terms govern your access to and use of our Site and the paid advertising and digital marketing services we provide.'
  ),
  paragraph(
    "By accessing our Site or engaging our services, you confirm that you are at least 18 years of age, have the legal authority to enter into a binding agreement, and agree to be bound by these Terms. If you do not agree, please do not use our Site or services."
  ),
  paragraph(
    "These Terms apply to all visitors, prospective clients, and existing clients, regardless of where you are located in the world. Where local laws impose specific rights or requirements, those may apply to you in addition to these Terms."
  ),

  // Section 1
  heading(2, "1. Our Services"),

  heading(3, "1.1 Scope of Services"),
  paragraph(
    "Profit Mill provides paid advertising and digital marketing services, which may include but are not limited to:"
  ),
  bulletItem("Pay-per-click (PPC) advertising management (Google Ads, Microsoft/Bing Ads, and similar platforms)"),
  bulletItem("Paid social media advertising (Meta/Facebook, Instagram, LinkedIn, TikTok, Pinterest, X/Twitter, and similar platforms)"),
  bulletItem("Display, programmatic, and retargeting advertising"),
  bulletItem("Landing page creation and conversion rate optimization (CRO)"),
  bulletItem("Ad creative strategy, copywriting, and design direction"),
  bulletItem("Campaign analytics, reporting, and performance audits"),
  bulletItem("Advertising account setup, restructuring, and management"),
  paragraph(
    'The specific services provided to any client will be as agreed in a separate written Service Agreement, Statement of Work, or Proposal (collectively referred to as the \u201CService Agreement\u201D). In the event of any conflict between these Terms and a Service Agreement, the Service Agreement shall prevail in respect of that engagement.'
  ),

  heading(3, "1.2 No Guarantee of Results"),
  paragraph(
    "Digital advertising involves inherent uncertainty. While we apply expertise and best practices to every campaign, we do not guarantee specific outcomes, including but not limited to revenue targets, return on ad spend (ROAS), cost per acquisition (CPA), click-through rates, impressions, leads, or sales. Advertising performance is influenced by many factors outside our control, including platform algorithm changes, market conditions, competition, seasonality, and client-side factors such as website quality, product-market fit, and pricing."
  ),

  heading(3, "1.3 Platform Dependency"),
  paragraph(
    "Our services are delivered in part through third-party advertising platforms (such as Google, Meta, LinkedIn, and others). We have no control over these platforms\u2019 policies, algorithms, pricing, availability, or terms of service. We are not liable for any disruption, suspension, policy change, account suspension, or other action taken by a third-party platform that affects your campaigns. It is your responsibility to ensure your business, products, and advertising content comply with each platform\u2019s advertising policies."
  ),

  // Section 2
  heading(2, "2. Client Responsibilities"),
  paragraph(
    "To enable us to deliver our services effectively, you agree to:"
  ),
  bulletItem("Provide accurate, complete, and timely information, access, and materials reasonably required for us to perform the services, including access to advertising accounts, analytics platforms, website credentials, and brand assets"),
  bulletItem("Ensure that all content, creative assets, products, services, and landing pages you ask us to advertise comply with applicable laws and the advertising policies of all relevant platforms"),
  bulletItem("Maintain sufficient advertising budget in your accounts or reimburse us promptly for ad spend incurred on your behalf, as set out in the Service Agreement"),
  bulletItem("Promptly review and provide feedback on deliverables, strategies, and reports within agreed timeframes"),
  bulletItem("Notify us promptly of any material changes to your business, products, services, or target audiences that may affect campaign strategy"),
  bulletItem("Not interfere with, pause, modify, or make changes to campaigns we are managing without prior written notification to us"),
  paragraph(
    "You are solely responsible for the accuracy and legality of the content, offers, and claims contained in your advertisements. We reserve the right to decline to produce or publish advertising content that we reasonably believe violates applicable law, platform policies, or our own ethical standards."
  ),

  // Section 3
  heading(2, "3. Fees, Billing, and Payment"),

  heading(3, "3.1 Agency Fees"),
  paragraph(
    "Our fees for services will be set out in your Service Agreement. We operate exclusively on a monthly retainer basis. All fees are exclusive of applicable taxes (including GST, HST, or other applicable taxes) unless otherwise stated, which shall be added at the applicable rate."
  ),

  heading(3, "3.2 Advertising Spend"),
  paragraph(
    "Ad spend paid to third-party platforms (e.g., Google, Meta) is separate from our agency fees unless otherwise explicitly stated in your Service Agreement. You are responsible for funding your advertising accounts directly or reimbursing us for any ad spend we advance on your behalf. We are not responsible for budget overruns caused by platform billing anomalies, and we will not be held liable for any charges incurred by advertising platforms beyond agreed budgets where such overruns result from platform behavior outside our control."
  ),

  heading(3, "3.3 Payment Terms"),
  paragraph(
    "Invoices are due and payable within 15 calendar days of the invoice date. We reserve the right to suspend services if payment is not received by the due date. Overdue amounts will accrue interest at the rate of 1% per month from the date payment was due until the date payment is received in full. You are responsible for all reasonable costs we incur in collecting overdue amounts, including legal fees."
  ),

  heading(3, "3.4 Fee Changes"),
  paragraph(
    "We reserve the right to adjust our fees upon 30 days\u2019 written notice. Continued use of our services after the notice period constitutes acceptance of the revised fees. If you do not accept a fee change, you may terminate the engagement in accordance with Section 9."
  ),

  // Section 4
  heading(2, "4. Intellectual Property"),

  heading(3, "4.1 Our Pre-Existing IP"),
  paragraph(
    'We retain all intellectual property rights in our methodologies, frameworks, processes, know-how, templates, tools, software, and any other materials developed by us prior to or independently of any client engagement (\u201CAgency IP\u201D). Nothing in these Terms or any Service Agreement transfers ownership of Agency IP to you.'
  ),

  heading(3, "4.2 Deliverables"),
  paragraph(
    "Unless otherwise agreed in writing in a Service Agreement, upon receipt of full payment of all fees due, we assign to you ownership of the final advertising creative deliverables specifically created for your campaigns (such as ad copy and designed creatives). This assignment does not include underlying Agency IP, third-party licensed elements (such as stock imagery or licensed fonts), tools, or platform configurations."
  ),

  heading(3, "4.3 Your Content and Materials"),
  paragraph(
    "You retain ownership of all intellectual property you provide to us, including your brand assets, logos, trademarks, images, product information, and content. You grant us a non-exclusive, royalty-free licence to use such materials solely for the purpose of performing the services during the term of the engagement. You represent and warrant that you own or have the necessary rights to all materials you provide, and that our use of such materials as directed will not infringe any third-party intellectual property rights."
  ),

  heading(3, "4.4 Portfolio and Case Studies"),
  paragraph(
    "We may wish to reference your business as a client and use aggregated or anonymized campaign performance data in our marketing materials, case studies, and portfolio. We will seek your prior written consent before identifying you by name or using your branding in any such materials."
  ),

  // Section 5
  heading(2, "5. Confidentiality"),
  paragraph(
    'Each party agrees to keep confidential all non-public information disclosed by the other party in connection with the services that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information and circumstances of disclosure (\u201CConfidential Information\u201D). Neither party will disclose the other\u2019s Confidential Information to third parties or use it for any purpose other than performing obligations under these Terms and any Service Agreement, without prior written consent.'
  ),
  paragraph(
    "This obligation does not apply to information that: (a) is or becomes publicly available through no breach of this clause; (b) was already known to the receiving party; (c) is independently developed without use of Confidential Information; or (d) must be disclosed by law or court order, provided the disclosing party is given prior written notice where permitted."
  ),
  paragraph(
    "Confidentiality obligations survive termination of services for a period of three (3) years."
  ),

  // Section 6
  heading(2, "6. Data Protection"),
  paragraph(
    "Each party shall comply with applicable data protection and privacy laws in connection with the services. To the extent we process personal data on your behalf as part of delivering the services, we will do so only in accordance with your instructions and applicable law, and we will enter into a Data Processing Agreement (DPA) with you where required by law (including under GDPR, UK GDPR, or PIPEDA)."
  ),
  paragraph(
    "You acknowledge that our services involve the use of third-party advertising platforms and analytics tools that may collect and process data about your website visitors and customers. You are responsible for maintaining a compliant privacy policy, obtaining any required consents from your users, and implementing appropriate consent management solutions (such as a cookie consent banner) on your website."
  ),
  linkParagraph(
    "Our collection and use of data through our website is governed by our Privacy Policy, available at ",
    "www.profitmill.io/privacy-policy",
    "https://www.profitmill.io/privacy-policy",
    "."
  ),

  // Section 7
  heading(2, "7. Representations and Warranties"),
  paragraph(
    "Each party represents and warrants to the other that:"
  ),
  bulletItem("It has the legal authority and capacity to enter into and perform its obligations under these Terms"),
  bulletItem("Its performance under these Terms will not violate any applicable law, regulation, or third-party agreement"),
  paragraph(
    "You additionally represent and warrant that:"
  ),
  bulletItem("All information, materials, and content you provide to us is accurate, complete, and does not infringe the intellectual property, privacy, or other rights of any third party"),
  bulletItem("Your products, services, and business operations comply with all applicable laws and regulations in your target markets"),
  bulletItem("Your advertising content, offers, and claims are truthful, not misleading, and comply with applicable consumer protection and advertising standards laws (including FTC guidelines in the US, ASA rules in the UK, and equivalent regulations elsewhere)"),
  bulletItem("You have all necessary licences, consents, and approvals to advertise the products and services we are engaged to promote"),

  // Section 8
  heading(2, "8. Limitation of Liability and Disclaimer"),

  heading(3, "8.1 Disclaimer of Warranties"),
  paragraph(
    'Our services and website are provided on an \u201Cas is\u201D and \u201Cas available\u201D basis. To the fullest extent permitted by applicable law, we disclaim all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, non-infringement, and any warranties arising from course of dealing or usage of trade. We do not warrant that our services will meet your specific business objectives or that advertising campaigns will achieve any particular result.'
  ),

  heading(3, "8.2 Limitation of Liability"),
  paragraph(
    "To the fullest extent permitted by applicable law, our total aggregate liability to you arising out of or in connection with these Terms or the services, whether in contract, tort (including negligence), breach of statutory duty, or otherwise, shall not exceed the total fees paid by you to us in the three (3) months immediately preceding the event giving rise to the claim."
  ),
  paragraph(
    "In no event shall either party be liable to the other for any indirect, incidental, special, consequential, exemplary, or punitive damages, including loss of profits, loss of revenue, loss of data, loss of goodwill, or business interruption, even if advised of the possibility of such damages."
  ),

  heading(3, "8.3 Exceptions"),
  paragraph(
    "Nothing in these Terms limits or excludes liability for: (a) death or personal injury caused by negligence; (b) fraud or fraudulent misrepresentation; (c) any liability that cannot be excluded or limited under applicable law, including consumer protection laws in your jurisdiction."
  ),

  heading(3, "8.4 Third-Party Platform Actions"),
  paragraph(
    "We accept no liability for any loss or damage arising from actions taken by third-party advertising platforms, including account suspensions, policy enforcement, algorithm changes, data loss, or platform outages, whether or not such actions relate to campaigns we manage on your behalf."
  ),

  // Section 9
  heading(2, "9. Term and Termination"),

  heading(3, "9.1 Term"),
  paragraph(
    "These Terms apply from the date you first access our Site or engage our services and continue until terminated. The term of any specific service engagement will be as set out in the applicable Service Agreement."
  ),

  heading(3, "9.2 Termination for Convenience"),
  paragraph(
    "Either party may terminate an ongoing service engagement by providing written notice as specified in the applicable Service Agreement (typically 30 days\u2019 written notice). During any notice period, both parties shall continue to perform their obligations. Fees accrued up to the termination date remain payable."
  ),

  heading(3, "9.3 Termination for Cause"),
  paragraph(
    "Either party may terminate an engagement immediately upon written notice if the other party: (a) materially breaches these Terms or the Service Agreement and fails to remedy the breach within 14 days of written notice; (b) becomes insolvent, enters administration, liquidation, or any analogous insolvency proceeding; or (c) commits fraud or engages in conduct that brings the other party into disrepute."
  ),

  heading(3, "9.4 Effect of Termination"),
  paragraph(
    "Upon termination: all outstanding fees and expenses become immediately due and payable; we will provide reasonable assistance in transitioning account access and materials to you or a new provider; each party will return or destroy the other\u2019s Confidential Information upon request; and any licences granted under these Terms will cease. Sections that by their nature should survive termination (including intellectual property, confidentiality, limitation of liability, and dispute resolution) shall continue to apply."
  ),

  // Section 10
  heading(2, "10. Acceptable Use of Our Website"),
  paragraph(
    "In accessing and using our Site, you agree that you will not:"
  ),
  bulletItem("Use the Site for any unlawful purpose or in violation of any applicable local, national, or international law or regulation"),
  bulletItem("Attempt to gain unauthorized access to any part of the Site or its related systems or networks"),
  bulletItem("Introduce viruses, trojans, worms, or other malicious or technologically harmful material"),
  bulletItem("Conduct any form of systematic data scraping, crawling, or harvesting without our prior written consent"),
  bulletItem("Reproduce, duplicate, copy, or resell any part of our Site in contravention of these Terms"),
  bulletItem("Transmit unsolicited commercial communications or spam"),
  bulletItem("Impersonate any person or entity or misrepresent your affiliation with any person or entity"),
  paragraph(
    "We reserve the right to restrict or terminate access to the Site for any user who violates these Terms or engages in conduct we determine to be harmful, at our sole discretion."
  ),

  // Section 11
  heading(2, "11. Third-Party Links and Content"),
  paragraph(
    "Our Site may contain links to third-party websites, tools, or resources. These links are provided for your convenience only and do not imply our endorsement of, or responsibility for, the content, products, or services of those third parties. We have no control over the content of third-party sites and accept no liability arising from your use of them. You access third-party sites at your own risk and subject to their terms and conditions."
  ),

  // Section 12
  heading(2, "12. Indemnification"),
  paragraph(
    "You agree to indemnify, defend, and hold harmless Profit Mill and its directors, officers, employees, contractors, and agents from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising out of or relating to: (a) your breach of these Terms or any Service Agreement; (b) your violation of any applicable law or third-party right, including intellectual property rights; (c) the content, products, or services you ask us to advertise; (d) your use of or reliance on our Site or services; or (e) any claim by a third party resulting from your acts or omissions."
  ),

  // Section 13
  heading(2, "13. Governing Law and Dispute Resolution"),

  heading(3, "13.1 Governing Law"),
  paragraph(
    "These Terms are governed by and construed in accordance with the laws of the Province of Ontario and the laws of Canada applicable therein, without regard to its conflict of law principles."
  ),

  heading(3, "13.2 Informal Resolution"),
  paragraph(
    "Before initiating any formal legal proceedings, the parties agree to attempt to resolve any dispute informally by notifying the other party in writing of the dispute and engaging in good-faith negotiations for a period of at least 30 days."
  ),

  heading(3, "13.3 Dispute Resolution"),
  paragraph(
    "If informal resolution is unsuccessful, disputes shall be resolved by binding arbitration administered by the ADR Institute of Canada in accordance with its applicable rules, unless either party elects to bring a claim in a court of competent jurisdiction for injunctive relief or claims below the applicable Ontario Small Claims Court monetary limit. Judgment on an arbitration award may be entered in any court of competent jurisdiction."
  ),

  heading(3, "13.4 Consumer Rights"),
  paragraph(
    "Nothing in this Section limits any statutory rights you may have as a consumer under the laws of your country of residence. EU and UK residents may have the right to bring disputes before their local courts and access alternative dispute resolution schemes regardless of any governing law provision."
  ),

  heading(3, "13.5 Class Action Waiver"),
  paragraph(
    "To the extent permitted by applicable law, you agree that any dispute resolution proceedings will be conducted on an individual basis only, and not as a class, consolidated, or representative action. This waiver does not apply where prohibited by law."
  ),

  // Section 14
  heading(2, "14. Changes to These Terms"),
  paragraph(
    "We reserve the right to modify these Terms at any time. When we make material changes, we will update the \u2018Last Updated\u2019 date at the top of this page and, where appropriate, notify you by email or by a prominent notice on the Site. Your continued use of the Site or services after such changes constitutes your acceptance of the revised Terms. We encourage you to review these Terms periodically."
  ),
  paragraph(
    "For existing clients under a Service Agreement, material changes to these Terms will not apply retroactively to the current term of that agreement without your written consent."
  ),

  // Section 15
  heading(2, "15. General Provisions"),
  bulletItemBold("Entire Agreement: ", "These Terms, together with any applicable Service Agreement, Privacy Policy, and Data Processing Agreement, constitute the entire agreement between you and us with respect to their subject matter and supersede all prior agreements, representations, and understandings."),
  bulletItemBold("Severability: ", "If any provision of these Terms is found to be unlawful, void, or unenforceable, that provision will be severed and the remaining provisions will continue in full force and effect."),
  bulletItemBold("Waiver: ", "Our failure to enforce any right or provision of these Terms does not constitute a waiver of that right or provision. A waiver is only effective if made in writing and signed by an authorized representative."),
  bulletItemBold("Assignment: ", "You may not assign or transfer your rights or obligations under these Terms without our prior written consent. We may assign these Terms or any of our rights or obligations hereunder to an affiliate or in connection with a merger, acquisition, or sale of assets, with notice to you."),
  bulletItemBold("Force Majeure: ", "Neither party shall be liable for any delay or failure to perform its obligations (other than payment obligations) resulting from causes beyond its reasonable control, including acts of God, war, terrorism, pandemic, government action, internet or platform outages, or natural disasters."),
  bulletItemBold("Notices: ", "Notices under these Terms shall be in writing and delivered by email to the addresses provided in your Service Agreement, or to us at peter@profitmill.io. Notices are effective upon confirmation of receipt."),
  bulletItemBold("Relationship of the Parties: ", "The parties are independent contractors. Nothing in these Terms creates a partnership, joint venture, agency, franchise, or employment relationship between the parties."),
  bulletItemBold("Language: ", "These Terms are written in English. Any translation is provided for convenience only; the English version shall prevail in the event of any conflict."),

  // Section 16
  heading(2, "16. Contact Us"),
  paragraph(
    "If you have any questions about these Terms and Conditions, please contact us at:"
  ),
  paragraph("Profit Mill"),
  linkParagraph("Email: ", "peter@profitmill.io", "mailto:peter@profitmill.io", ""),
  linkParagraph("Website: ", "www.profitmill.io", "https://www.profitmill.io", ""),
];

// First, query for existing document ID
async function getExistingDocId() {
  const query = encodeURIComponent('*[_type == "terms"][0]{_id}');
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${query}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  const data = await res.json();
  return data.result?._id;
}

async function main() {
  console.log("Fetching existing terms document...");
  const existingId = await getExistingDocId();

  const docId = existingId || "terms";
  console.log(`Document ID: ${docId}`);

  const mutations = [
    {
      createOrReplace: {
        _id: docId,
        _type: "terms",
        title: "Terms & Conditions",
        lastUpdated: "2026-03-03T00:00:00.000Z",
        content,
      },
    },
  ];

  console.log(`Pushing ${content.length} blocks to Sanity...`);

  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ mutations }),
  });

  const result = await res.json();

  if (res.ok) {
    console.log("Terms & conditions updated successfully!");
    console.log(`Transaction ID: ${result.transactionId}`);
    console.log(`Results: ${JSON.stringify(result.results)}`);
  } else {
    console.error("Failed to update:", JSON.stringify(result, null, 2));
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
