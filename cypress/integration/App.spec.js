/* eslint-disable jest/valid-expect */
/// <reference types="cypress" />

const PROMPT = '[data-testid="prompt"]'
const PROMPT_INFO = '[data-testid="promptInfo"]'
const HISTORY = '[data-testid="history"]'
const HISTORY_ENTRY = '[data-testid="historyEntry"]'

function clickSpin() {
  cy.get('button').contains(/spin/i).click()
}

function waitForWheel() {
  cy.wait(12000)
}

function clickPrompt() {
  cy.get(PROMPT).click()
}

function clickPromptInfo() {
  cy.get(PROMPT_INFO).click()
}

function clickHistoryEntry() {
  cy.get(HISTORY_ENTRY).click()
}

describe('Wheel of TBR', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.viewport(750, 1334)
  })

  describe('PromptInfo (Modal)', () => {
    it('Prompts and History Entries can be clicked and display a modal with more information', () => {
      cy.get(PROMPT_INFO).should('not.exist')
      clickSpin()
      waitForWheel()
      clickPrompt()
      cy.get(PROMPT_INFO).should('be.visible')
      clickPromptInfo()
      cy.get(PROMPT_INFO).should('not.exist')
      clickSpin()
      clickHistoryEntry()
      cy.get(PROMPT_INFO).should('be.visible')
    })

    it('Loading Circles cannot be clicked', () => {
      clickSpin()
      clickPrompt()
      cy.get(PROMPT_INFO).should('not.exist')
    })

    it('Initial prompt cannot be clicked', () => {
      clickPrompt()
      cy.get(PROMPT_INFO).should('not.exist')
    })

    it('Last prompt cannot be clicked', () => {
      for (let i = 0; i <= 21; i++) {
        clickSpin()
        cy.reload()
      }
      clickPrompt()
      cy.get(PROMPT_INFO).should('not.exist')
    })
  })
})
