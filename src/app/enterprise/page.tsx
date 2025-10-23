'use client';

import React from 'react';
import Link from 'next/link';
import {
  Building,
  Users,
  Shield,
  Database,
  Workflow,
  FileCheck,
  BarChart,
  Clock,
  CheckCircle,
} from 'lucide-react';

export default function EnterprisePage() {
  const features = [
    {
      icon: Users,
      title: 'Multi-User Collaboration',
      description: 'Team-based access with role permissions and audit trails for compliance',
    },
    {
      icon: Database,
      title: 'Bulk Processing',
      description: 'Upload and analyze hundreds of documents simultaneously',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'SOC 2 compliant with bank-level encryption and SSO integration',
    },
    {
      icon: Workflow,
      title: 'Custom Workflows',
      description: 'Tailored automation for complex multi-state and entity structures',
    },
    {
      icon: FileCheck,
      title: 'Compliance Management',
      description: 'Automated tracking of deadlines, filings, and regulatory changes',
    },
    {
      icon: BarChart,
      title: 'Advanced Analytics',
      description: 'Real-time dashboards and reporting for executive decision-making',
    },
  ];

  const useCases = [
    {
      title: 'Fortune 500 Corporations',
      description: 'Multi-entity structures across all 50 states with complex nexus requirements',
      benefits: ['Centralized tax management', 'Automated compliance tracking', 'Real-time reporting'],
    },
    {
      title: 'Multi-State Operations',
      description: 'Businesses with significant Washington presence and operations nationwide',
      benefits: ['Cross-state compliance', 'Apportionment analysis', 'Nexus monitoring'],
    },
    {
      title: 'Private Equity',
      description: 'Portfolio companies requiring standardized tax processes and reporting',
      benefits: ['Standardized workflows', 'Portfolio-wide analytics', 'Due diligence support'],
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Building className="w-20 h-20 mx-auto mb-6 text-purple-300" />
            <h1 className="text-5xl font-bold mb-6">
              Enterprise Tax Solutions
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Scalable, secure Washington State tax compliance for Fortune 500 companies, 
              multi-state corporations, and complex organizational structures
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/chat"
                className="px-8 py-4 bg-white text-purple-900 rounded-lg font-semibold hover:bg-gray-100 transition-all"
              >
                Schedule Demo
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-transparent border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-purple-900 transition-all"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for the most demanding tax compliance requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-xl hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Proven Enterprise Use Cases
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by leading corporations across industries
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{useCase.title}</h3>
                  <p className="text-purple-100">{useCase.description}</p>
                </div>
                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Key Benefits:</h4>
                  <ul className="space-y-3">
                    {useCase.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-3xl p-12 text-white">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <Shield className="w-16 h-16 mr-6" />
                <div>
                  <h2 className="text-4xl font-bold mb-2">
                    Enterprise Security & Compliance
                  </h2>
                  <p className="text-xl text-gray-200">
                    Your data security is our top priority
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Security Standards</h3>
                  <ul className="space-y-3">
                    {[
                      'SOC 2 Type II Certified',
                      'AES-256 Encryption',
                      'SSO Integration (SAML, OAuth)',
                      'Regular Security Audits',
                      'GDPR & CCPA Compliant',
                    ].map((item, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Enterprise Features</h3>
                  <ul className="space-y-3">
                    {[
                      'Role-Based Access Control',
                      'Complete Audit Trails',
                      '99.9% Uptime SLA',
                      '24/7 Enterprise Support',
                      'Dedicated Account Manager',
                    ].map((item, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Clock className="w-16 h-16 mx-auto mb-6 text-purple-600" />
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Scale Your Tax Operations?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Schedule a personalized demo to see how WashingtonTaxDesk can transform 
              your enterprise tax compliance
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Schedule Enterprise Demo
              </Link>
              <Link
                href="/chat"
                className="px-8 py-4 bg-white border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all"
              >
                Try AI Assistant
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
