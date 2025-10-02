# frozen_string_literal: true
# typed: strict

module Tables
  class TableImplementation
    extend T::Sig
    extend T::Helpers

    sig { returns(T.nilable(String)) }
    attr_reader :list_uid

    abstract!

    sig do
      abstract.params(selected: T::Array[Column]).returns(TableRows)
    end
    def rows(selected:); end

    sig do
      params(list_uid: T.nilable(String)).void
    end
    def initialize(list_uid: nil)
      @list_uid = list_uid
    end

    sig { abstract.returns(Pathname) }
    def column_definitions_path; end

    sig { abstract.returns(T::Array[Column]) }
    def columns; end
  end
end
